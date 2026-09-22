import { createFileRoute, Link } from '@tanstack/react-router'
import { useState, useMemo, type FormEvent } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getCategories, createCategory, updateCategory, deleteCategory } from '#/server/function/categories'

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

export const COLOR_PALETTES = [
  { name: 'Indigo', hex: '#4f46e5' },
  { name: 'Emerald', hex: '#059669' },
  { name: 'Amber', hex: '#d97706' },
  { name: 'Purple', hex: '#7c3aed' },
  { name: 'Rose', hex: '#e11d48' },
  { name: 'Cyan', hex: '#0891b2' },
  { name: 'Slate', hex: '#475569' },
  { name: 'Orange', hex: '#ea580c' },
]

export const AVAILABLE_ICONS = [
  { name: 'devices', label: 'Devices' },
  { name: 'bolt', label: 'Bolt' },
  { name: 'article', label: 'Article' },
  { name: 'psychology', label: 'Deep Mind' },
  { name: 'school', label: 'Tutorial' },
  { name: 'mail', label: 'Newsletter' },
  { name: 'videocam', label: 'Video' },
  { name: 'podcasts', label: 'Podcast' },
  { name: 'palette', label: 'Creative' },
  { name: 'code', label: 'Tech Code' },
  { name: 'folder', label: 'Folder' },
  { name: 'insights', label: 'Insights' },
]

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

  const [formName, setFormName] = useState('')
  const [formSlug, setFormSlug] = useState('')
  const [formDescription, setFormDescription] = useState('')
  const [formColor, setFormColor] = useState(COLOR_PALETTES[0].hex)
  const [formIcon, setFormIcon] = useState(AVAILABLE_ICONS[0].name)
  const [formStatus, setFormStatus] = useState<'ACTIVE' | 'ARCHIVED'>('ACTIVE')
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  // ── Fetch dari server, bukan localStorage ──
  const { data, isLoading, isError } = useQuery({
    queryKey: ['categories'],
    queryFn: () => getCategories(),
  })

  // Mapping isActive (boolean di DB) -> status (string di UI)
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

  // ── Mutations ──
  const { mutate: submitCreate, isPending: isCreating } = useMutation({
    mutationFn: (payload: {
      name: string
      slug: string
      description?: string
      color: string
      icon: string
      isActive: boolean
    }) => createCategory({ data: payload }),
    onSuccess: (result: any) => {
      queryClient.invalidateQueries({ queryKey: ['categories'] })
      showToast(`Category "${result.category.name}" created successfully`)
      setIsModalOpen(false)
    },
  })

  const { mutate: submitUpdate, isPending: isUpdating } = useMutation({
    mutationFn: (payload: {
      id: string
      name?: string
      slug?: string
      description?: string
      color?: string
      icon?: string
      isActive?: boolean
    }) => updateCategory({ data: payload }),
    onSuccess: (result: any) => {
      queryClient.invalidateQueries({ queryKey: ['categories'] })
      showToast(`Category "${result.category.name}" updated successfully`)
      setIsModalOpen(false)
    },
  })

  const { mutate: submitDelete } = useMutation({
    mutationFn: (id: string) => deleteCategory({ data: { id } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] })
      showToast(`Category "${deleteTarget?.name}" deleted`)
      setDeleteTarget(null)
    },
  })

  const handleOpenCreate = () => {
    setEditingCategory(null)
    setFormName('')
    setFormSlug('')
    setFormDescription('')
    setFormColor(COLOR_PALETTES[0].hex)
    setFormIcon(AVAILABLE_ICONS[0].name)
    setFormStatus('ACTIVE')
    setIsModalOpen(true)
  }

  const handleOpenEdit = (cat: Category) => {
    setEditingCategory(cat)
    setFormName(cat.name)
    setFormSlug(cat.slug)
    setFormDescription(cat.description)
    setFormColor(cat.color)
    setFormIcon(cat.icon)
    setFormStatus(cat.status)
    setIsModalOpen(true)
  }

  const handleNameChange = (val: string) => {
    setFormName(val)
    if (!editingCategory) {
      const generated = val
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')
      setFormSlug(generated)
    }
  }

  // ── Save (Create atau Update) — kirim ke server function ──
  const handleSave = (e: FormEvent) => {
    e.preventDefault()
    if (!formName.trim()) return

    const basePayload = {
      name: formName.trim(),
      slug: formSlug.trim() || formName.toLowerCase().replace(/\s+/g, '-'),
      description: formDescription.trim() || undefined,
      color: formColor,
      icon: formIcon,
      isActive: formStatus === 'ACTIVE',
    }

    if (editingCategory) {
      submitUpdate({ id: editingCategory.id, ...basePayload })
    } else {
      submitCreate(basePayload)
    }
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
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-on-surface text-surface shadow-xl border border-surface-variant/40 animate-fade-in text-label-sm font-label-sm">
          <span className="material-symbols-outlined text-emerald-400 text-[18px]">check_circle</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header section */}
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

        {/* Stats summary banner */}
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

      {/* Filter and search controls */}
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

        {/* Categories Grid */}
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

                  <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2 min-h-[40px] mb-4">
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
                      onClick={() => setDeleteTarget(category)}
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

      {/* Modal: Create or Edit Category */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-on-surface/40 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-lg bg-surface-container-lowest rounded-2xl shadow-2xl border border-surface-variant overflow-hidden flex flex-col">
            <div className="px-6 py-4 border-b border-surface-variant flex items-center justify-between bg-surface-container-low/40">
              <div className="flex items-center gap-2.5">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-white shadow-sm"
                  style={{ backgroundColor: formColor }}
                >
                  <span className="material-symbols-outlined text-[18px]">{formIcon}</span>
                </div>
                <div>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                    {editingCategory ? 'Edit Category' : 'Create Category'}
                  </h3>
                  <p className="font-label-xs text-label-xs text-outline">
                    {editingCategory
                      ? 'Update category properties and appearance'
                      : 'Define a new taxonomy grouping for production media'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg text-outline hover:text-on-surface hover:bg-surface-container transition-colors"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block font-label-sm text-label-sm text-on-surface font-medium">
                    Category Name <span className="text-error">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. AI Workflows"
                    value={formName}
                    onChange={(e) => handleNameChange(e.target.value)}
                    className="w-full h-10 px-3 bg-surface-container-low focus:bg-surface-container-lowest rounded-lg font-body-sm text-body-sm text-on-surface border border-surface-variant focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block font-label-sm text-label-sm text-on-surface font-medium">
                    Slug Identifier
                  </label>
                  <div className="relative flex items-center">
                    <span className="absolute left-3 text-outline text-[13px] font-mono">#</span>
                    <input
                      type="text"
                      placeholder="ai-workflows"
                      value={formSlug}
                      onChange={(e) => setFormSlug(e.target.value)}
                      className="w-full h-10 pl-7 pr-3 bg-surface-container-low focus:bg-surface-container-lowest rounded-lg font-mono text-[12px] text-on-surface border border-surface-variant focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <label className="block font-label-sm text-label-sm text-on-surface font-medium">
                  Description
                </label>
                <textarea
                  rows={2}
                  placeholder="Describe what content belongs in this category..."
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  className="w-full px-3 py-2 bg-surface-container-low focus:bg-surface-container-lowest rounded-lg font-body-sm text-body-sm text-on-surface border border-surface-variant focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block font-label-sm text-label-sm text-on-surface font-medium">
                  Theme Color
                </label>
                <div className="flex items-center gap-2 flex-wrap">
                  {COLOR_PALETTES.map((c) => (
                    <button
                      key={c.hex}
                      type="button"
                      onClick={() => setFormColor(c.hex)}
                      className={`w-7 h-7 rounded-full transition-transform flex items-center justify-center ${
                        formColor === c.hex ? 'ring-2 ring-offset-2 ring-primary scale-110' : 'hover:scale-105'
                      }`}
                      style={{ backgroundColor: c.hex }}
                      title={c.name}
                    >
                      {formColor === c.hex && (
                        <span className="material-symbols-outlined text-white text-[14px]">check</span>
                      )}
                    </button>
                  ))}
                  <div className="flex items-center gap-1.5 ml-2">
                    <input
                      type="color"
                      value={formColor}
                      onChange={(e) => setFormColor(e.target.value)}
                      className="w-7 h-7 rounded-lg border border-surface-variant cursor-pointer p-0 bg-transparent"
                      title="Custom color"
                    />
                    <span className="font-mono text-[11px] text-outline uppercase">{formColor}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block font-label-sm text-label-sm text-on-surface font-medium">
                  Icon Representation
                </label>
                <div className="grid grid-cols-6 gap-2 max-h-36 overflow-y-auto p-1 bg-surface-container-low/50 rounded-xl border border-surface-variant/70">
                  {AVAILABLE_ICONS.map((ic) => (
                    <button
                      key={ic.name}
                      type="button"
                      onClick={() => setFormIcon(ic.name)}
                      className={`p-2 rounded-lg flex flex-col items-center gap-1 transition-all ${
                        formIcon === ic.name
                          ? 'bg-surface-container-lowest text-primary shadow-sm ring-1 ring-primary/40 font-semibold'
                          : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[20px]">{ic.name}</span>
                      <span className="text-[10px] truncate max-w-[50px]">{ic.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <div>
                  <span className="font-label-sm text-label-sm text-on-surface font-medium block">
                    Category Status
                  </span>
                  <span className="font-label-xs text-label-xs text-outline">
                    Archived categories won't appear in default active filters
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setFormStatus(formStatus === 'ACTIVE' ? 'ARCHIVED' : 'ACTIVE')}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      formStatus === 'ACTIVE' ? 'bg-primary-container' : 'bg-surface-container-highest'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        formStatus === 'ACTIVE' ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                  <span className="font-label-xs text-label-xs font-semibold text-on-surface">{formStatus}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-surface-variant flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-lg font-label-md text-label-md text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isCreating || isUpdating}
                  className="px-5 py-2 rounded-lg font-label-md text-label-md bg-primary-container text-on-primary shadow-sm hover:bg-primary transition-all active:scale-[0.99] disabled:opacity-60"
                >
                  {isCreating || isUpdating
                    ? 'Saving...'
                    : editingCategory
                      ? 'Save Changes'
                      : 'Create Category'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
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
              Are you sure you want to delete this category? Any content assigned to this category will need to be reclassified.
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