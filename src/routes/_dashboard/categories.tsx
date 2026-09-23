import { createFileRoute, Link } from '@tanstack/react-router'
import { useState, useMemo } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getCategories, createCategory, updateCategory, deleteCategory } from '#/server/function/categories'

import CategoryFormModal from '#/components/CategoryFormModal'

export interface Category {
  id: string
  name: string
  slug: string
  description: string
  color: string
  icon: string
  itemCount: number
  status: 'ACTIVE' | 'ARCHIVED'
  createdAt: string
}

export const Route = createFileRoute('/_dashboard/categories')({
  component: RouteComponent,
})

function RouteComponent() {
  const queryClient = useQueryClient()

  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'ACTIVE' | 'ARCHIVED'>('ALL')

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<Category | null>(null)
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  const { data, isLoading, isError } = useQuery({
    queryKey: ['categories'],
    queryFn: () => getCategories(),
  })

  const categories: Category[] = (data?.categories ?? []).map((cat: any) => ({
    id: cat.id,
    name: cat.name,
    slug: cat.slug,
    description: cat.description ?? '',
    color: cat.color,
    icon: cat.icon,
    itemCount: cat.itemCount ?? 0,
    status: cat.isActive ? 'ACTIVE' : 'ARCHIVED',
    createdAt: cat.createdAt,
  }))

  const showToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 3000)
  }

  const { mutate: submitCreate, isPending: isCreating } = useMutation({
    mutationFn: (payload: any) => createCategory({ data: payload }),
    onSuccess: (result: any) => {
      queryClient.invalidateQueries({ queryKey: ['categories'] })
      showToast(`Category "${result.category.name}" created successfully`)
      setIsModalOpen(false)
    },
    onError: (err: any) => showToast(err.message || 'Gagal membuat kategori'),
  })

  const { mutate: submitUpdate, isPending: isUpdating } = useMutation({
    mutationFn: (payload: any) => updateCategory({ data: payload }),
    onSuccess: (result: any) => {
      queryClient.invalidateQueries({ queryKey: ['categories'] })
      showToast(`Category "${result.category.name}" updated successfully`)
      setIsModalOpen(false)
    },
    onError: (err: any) => showToast(err.message || 'Gagal update kategori'),
  })

  const { mutate: submitDelete } = useMutation({
    mutationFn: (id: string) => deleteCategory({ data: { id } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] })
      showToast(`Category "${deleteTarget?.name}" deleted`)
      setDeleteTarget(null)
    },
    onError: (err: any) => {
      // Kemungkinan besar foreign key constraint — kategori masih punya task terkait
      showToast(err.message || 'Gagal menghapus kategori — mungkin masih ada task terkait')
    },
  })

  const handleOpenCreate = () => {
    setEditingCategory(null)
    setIsModalOpen(true)
  }

  const handleOpenEdit = (cat: Category) => {
    setEditingCategory(cat)
    setIsModalOpen(true)
  }

  // Cegah delete di UI kalau kategori masih punya task terkait
  const handleOpenDelete = (cat: Category) => {
    if (cat.itemCount > 0) {
      showToast(`Tidak bisa hapus "${cat.name}" — masih ada ${cat.itemCount} task terkait`)
      return
    }
    setDeleteTarget(cat)
  }

  const confirmDelete = () => {
    if (!deleteTarget) return
    submitDelete(deleteTarget.id)
  }

  const handleToggleStatus = (cat: Category) => {
    const newIsActive = cat.status !== 'ACTIVE'
    submitUpdate({ id: cat.id, isActive: newIsActive })
    showToast(`"${cat.name}" moved to ${newIsActive ? 'active' : 'archived'}`)
  }

  const filteredCategories = useMemo(() => {
    return categories.filter((cat) => {
      if (statusFilter !== 'ALL' && cat.status !== statusFilter) return false
      if (searchQuery) {
        const q = searchQuery.toLowerCase()
        return (
          cat.name.toLowerCase().includes(q) ||
          cat.slug.toLowerCase().includes(q) ||
          cat.description.toLowerCase().includes(q)
        )
      }
      return true
    })
  }, [categories, statusFilter, searchQuery])

  const totalCount = categories.length
  const activeCount = categories.filter((c) => c.status === 'ACTIVE').length
  const totalItemsLinked = categories.reduce((acc, curr) => acc + curr.itemCount, 0)

  if (isLoading) {
    return <div className="p-margin font-body-sm text-body-sm text-outline">Loading categories...</div>
  }

  if (isError) {
    return (
      <div className="p-margin font-body-sm text-body-sm text-error">
        Gagal memuat kategori. Coba refresh halaman.
      </div>
    )
  }

  return (
    <div className="flex flex-col w-full pb-16">
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-on-surface text-surface shadow-xl border border-surface-variant/40 animate-fade-in text-label-sm font-label-sm">
          <span className="material-symbols-outlined text-emerald-400 text-[18px]">check_circle</span>
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="p-margin border-b border-surface-variant bg-surface-container-lowest flex flex-col gap-4">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <div className="flex items-center gap-2 text-outline font-label-xs text-label-xs mb-1">
              <span>Production Views</span>
              <span>/</span>
              <span className="text-on-surface font-medium">Categories</span>
            </div>
            <div className="flex items-center gap-3">
              <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
                Manage Categories
              </h1>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-label-xs font-label-xs bg-surface-container-high text-on-surface-variant font-medium">
                {totalCount} Total
              </span>
            </div>
            <p className="font-body-sm text-body-sm text-outline mt-0.5 max-w-2xl">
              Organize content taxonomy, manage color coding, and structure classification rules across all studio publications.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/content"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-surface-container-low text-on-surface font-label-md text-label-md hover:bg-surface-container transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">database</span>
              <span>Content Database</span>
            </Link>
            <button
              id="new-category-btn"
              onClick={handleOpenCreate}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary-container text-on-primary font-label-md text-label-md shadow-sm hover:bg-primary transition-all active:scale-[0.99]"
            >
              <span className="material-symbols-outlined text-[18px]">add</span>
              <span>New Category</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          <div className="px-4 py-3 rounded-xl bg-surface-container-low/80 border border-surface-variant/60 flex items-center justify-between">
            <div>
              <span className="font-label-xs text-label-xs text-outline uppercase tracking-wider block">
                Active Categories
              </span>
              <span className="font-headline-sm text-headline-sm text-on-surface font-bold mt-0.5 block">
                {activeCount}
              </span>
            </div>
            <div className="w-10 h-10 rounded-lg bg-primary-container/10 text-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">category</span>
            </div>
          </div>

          <div className="px-4 py-3 rounded-xl bg-surface-container-low/80 border border-surface-variant/60 flex items-center justify-between">
            <div>
              <span className="font-label-xs text-label-xs text-outline uppercase tracking-wider block">
                Tagged Contents
              </span>
              <span className="font-headline-sm text-headline-sm text-on-surface font-bold mt-0.5 block">
                {totalItemsLinked} Items
              </span>
            </div>
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">layers</span>
            </div>
          </div>

          <div className="px-4 py-3 rounded-xl bg-surface-container-low/80 border border-surface-variant/60 flex items-center justify-between">
            <div>
              <span className="font-label-xs text-label-xs text-outline uppercase tracking-wider block">
                Taxonomy Coverage
              </span>
              <span className="font-headline-sm text-headline-sm text-on-surface font-bold mt-0.5 block">
                {totalCount > 0 ? Math.round((activeCount / totalCount) * 100) : 0}% Active
              </span>
            </div>
            <div className="w-10 h-10 rounded-lg bg-purple-500/10 text-purple-600 flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">verified</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-margin flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-80">
            <span className="material-symbols-outlined absolute left-3 top-2.5 text-outline text-[18px]">
              search
            </span>
            <input
              type="text"
              placeholder="Search category, slug, or details..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-9 pl-9 pr-3 bg-surface-container-lowest border border-surface-variant rounded-lg text-body-sm font-body-sm text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-2.5 text-outline hover:text-on-surface"
              >
                <span className="material-symbols-outlined text-[16px]">close</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-1.5 p-1 rounded-lg bg-surface-container-low border border-surface-variant self-start sm:self-auto">
            <button
              onClick={() => setStatusFilter('ALL')}
              className={`px-3 py-1 rounded-md font-label-xs text-label-xs transition-all ${
                statusFilter === 'ALL'
                  ? 'bg-surface-container-lowest text-primary font-semibold shadow-sm'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              All ({categories.length})
            </button>
            <button
              onClick={() => setStatusFilter('ACTIVE')}
              className={`px-3 py-1 rounded-md font-label-xs text-label-xs transition-all ${
                statusFilter === 'ACTIVE'
                  ? 'bg-surface-container-lowest text-primary font-semibold shadow-sm'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Active ({categories.filter((c) => c.status === 'ACTIVE').length})
            </button>
            <button
              onClick={() => setStatusFilter('ARCHIVED')}
              className={`px-3 py-1 rounded-md font-label-xs text-label-xs transition-all ${
                statusFilter === 'ARCHIVED'
                  ? 'bg-surface-container-lowest text-primary font-semibold shadow-sm'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Archived ({categories.filter((c) => c.status === 'ARCHIVED').length})
            </button>
          </div>
        </div>

        {filteredCategories.length === 0 ? (
          <div className="p-12 text-center bg-surface-container-lowest rounded-xl border border-surface-variant flex flex-col items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center text-outline mb-3">
              <span className="material-symbols-outlined text-[24px]">category</span>
            </div>
            <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
              No categories found
            </h3>
            <p className="font-body-sm text-body-sm text-outline mt-1 max-w-sm">
              {searchQuery
                ? `No categories matching "${searchQuery}". Try clearing the search query.`
                : 'Get started by creating your first content category.'}
            </p>
            {searchQuery ? (
              <button
                onClick={() => setSearchQuery('')}
                className="mt-4 px-3.5 py-1.5 rounded-lg bg-surface-container text-on-surface font-label-sm text-label-sm hover:bg-surface-container-high transition-colors"
              >
                Clear Search
              </button>
            ) : (
              <button
                onClick={handleOpenCreate}
                className="mt-4 px-4 py-2 rounded-lg bg-primary-container text-on-primary font-label-md text-label-md shadow-sm hover:bg-primary transition-colors"
              >
                Create Category
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredCategories.map((category) => (
              <div
                key={category.id}
                className="bg-surface-container-lowest rounded-xl border border-surface-variant p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-white shadow-sm"
                        style={{ backgroundColor: category.color }}
                      >
                        <span className="material-symbols-outlined text-[20px]">{category.icon}</span>
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-label-md text-label-md text-on-surface font-semibold truncate">
                          {category.name}
                        </h3>
                        <span className="font-mono text-[11px] text-outline block truncate">
                          #{category.slug}
                        </span>
                      </div>
                    </div>

                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium ${
                        category.status === 'ACTIVE'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-surface-container text-outline border border-surface-variant'
                      }`}
                    >
                      {category.status === 'ACTIVE' ? 'Active' : 'Archived'}
                    </span>
                  </div>

                  <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2 min-h-10 mb-4">
                    {category.description || 'No description provided.'}
                  </p>
                </div>

                <div className="pt-3 border-t border-surface-variant flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[16px] text-outline">description</span>
                    <span className="font-label-xs text-label-xs text-outline">
                      {category.itemCount} linked {category.itemCount === 1 ? 'item' : 'items'}
                    </span>
                  </div>

                  <div className="flex items-center gap-1 opacity-90 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => handleToggleStatus(category)}
                      title={category.status === 'ACTIVE' ? 'Archive category' : 'Activate category'}
                      className="p-1.5 rounded-lg text-outline hover:text-on-surface hover:bg-surface-container transition-colors"
                    >
                      <span className="material-symbols-outlined text-[17px]">
                        {category.status === 'ACTIVE' ? 'archive' : 'unarchive'}
                      </span>
                    </button>
                    <button
                      onClick={() => handleOpenEdit(category)}
                      title="Edit category"
                      className="p-1.5 rounded-lg text-outline hover:text-primary hover:bg-surface-container transition-colors"
                    >
                      <span className="material-symbols-outlined text-[17px]">edit</span>
                    </button>
                    <button
                      disabled={category.itemCount > 0}
                      onClick={() => handleOpenDelete(category)}
                      title="Delete category"
                      className="p-1.5 rounded-lg text-outline hover:text-error hover:bg-error-container/20 transition-colors"
                    >
                      <span className="material-symbols-outlined text-[17px]">delete</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {isModalOpen && (
        <CategoryFormModal
          key={editingCategory?.id ?? 'new'}
          category={editingCategory}
          onClose={() => setIsModalOpen(false)}
          onSubmitCreate={submitCreate}
          onSubmitUpdate={submitUpdate}
          isSaving={isCreating || isUpdating}
        />
      )}

      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-on-surface/40 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md bg-surface-container-lowest rounded-2xl shadow-2xl border border-surface-variant p-6 flex flex-col">
            <div className="w-12 h-12 rounded-full bg-error-container/40 text-error flex items-center justify-center mb-4">
              <span className="material-symbols-outlined text-[24px]">delete</span>
            </div>
            <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
              Delete "{deleteTarget.name}"?
            </h3>
            <p className="font-body-sm text-body-sm text-outline mt-1.5">
              Are you sure you want to delete this category? This action cannot be undone.
            </p>
            <div className="mt-6 flex items-center justify-end gap-2.5">
              <button
                onClick={() => setDeleteTarget(null)}
                className="px-4 py-2 rounded-lg font-label-md text-label-md text-on-surface-variant hover:bg-surface-container transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 rounded-lg font-label-md text-label-md bg-error text-on-error shadow-sm hover:bg-error/90 transition-all"
              >
                Yes, Delete Category
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}