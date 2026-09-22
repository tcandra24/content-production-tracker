import { useState, useMemo } from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import TaskSheet from '../../components/TaskSheet'
import { getTasks, deleteTask, updateTaskStage } from '#/server/function/tasks'
import { getCategories } from '#/server/function/categories'

type ViewMode = 'TABLE' | 'KANBAN'

// ── Mapping antara value database (lowercase) dan label tampilan (UPPERCASE) ──
const STAGE_DB_TO_UI: Record<string, string> = {
  idea: 'IDEA',
  scripting: 'SCRIPTING',
  production: 'RECORDING',
  editing: 'EDITING',
  published: 'PUBLISHED',
}

const STAGE_COLUMNS: { dbValue: string; label: string; bgClass: string; dotClass: string }[] = [
  { dbValue: 'idea', label: 'Idea', bgClass: 'bg-[#FEF3C7]', dotClass: 'bg-[#D97706]' },
  { dbValue: 'scripting', label: 'Scripting', bgClass: 'bg-[#DBEAFE]', dotClass: 'bg-[#2563EB]' },
  { dbValue: 'production', label: 'Recording / Writing', bgClass: 'bg-[#FED7AA]', dotClass: 'bg-[#EA580C]' },
  { dbValue: 'editing', label: 'Editing', bgClass: 'bg-[#E9D5FF]', dotClass: 'bg-[#9333EA]' },
  { dbValue: 'published', label: 'Published', bgClass: 'bg-[#D1FAE5]', dotClass: 'bg-[#059669]' },
]
const TYPE_DB_TO_UI: Record<string, string> = { video: 'VIDEO', article: 'ARTICLE' }

export const Route = createFileRoute('/_dashboard/content')({
  component: RouteComponent,
})

function RouteComponent() {
  const queryClient = useQueryClient()

  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState('ALL')
  const [stageFilter, setStageFilter] = useState('ALL')
  const [categoryFilter, setCategoryFilter] = useState('ALL')
  const [isCompact, setIsCompact] = useState(false)
  const [viewMode, setViewMode] = useState<ViewMode>('TABLE')
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const [isTaskSheetOpen, setIsTaskSheetOpen] = useState(false)
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null)
  const [draggedTaskId, setDraggedTaskId] = useState<string | null>(null)

  // ── Fetch data asli ──
  const { data: tasksData, isLoading } = useQuery({
    queryKey: ['tasks'],
    queryFn: () => getTasks(),
  })
  const { data: categoriesData } = useQuery({
    queryKey: ['categories'],
    queryFn: () => getCategories(),
  })

  const rawTasks = tasksData?.tasks ?? []
  const categoryList = categoriesData?.categories ?? []

  // ── Mutations ──
  const { mutate: removeTask } = useMutation({
    mutationFn: (id: string) => deleteTask({ data: { id } }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['tasks'] }),
  })

  const { mutate: changeStage } = useMutation({
    mutationFn: (payload: { id: string; stage: string }) => updateTaskStage({ data: payload }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['tasks'] }),
  })

  // ── Transform data server -> shape yang dipakai tampilan ──
  const filteredData = useMemo(() => {
    return rawTasks
      .map((task: any) => ({
        id: task.id,
        title: task.title,
        type: TYPE_DB_TO_UI[task.contentType] ?? task.contentType.toUpperCase(),
        stage: STAGE_DB_TO_UI[task.stage] ?? task.stage.toUpperCase(),
        stageDb: task.stage,
        category: task.category?.name ?? 'Uncategorized',
        categoryId: task.categoryId,
        tags: task.taskTags?.map((tt: any) => tt.tag.name) ?? [],
        deadline: task.deadline,
        date: task.deadline
          ? new Date(task.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
          : '—',
      }))
      .filter((item) => {
        if (search && !item.title.toLowerCase().includes(search.toLowerCase())) return false
        if (typeFilter !== 'ALL' && item.type !== typeFilter) return false
        if (stageFilter !== 'ALL' && item.stage !== stageFilter) return false
        if (categoryFilter !== 'ALL' && item.category !== categoryFilter) return false
        return true
      })
  }, [rawTasks, search, typeFilter, stageFilter, categoryFilter])

  const toggleSelectAll = (checked: boolean) => {
    if (checked) setSelectedIds(new Set(filteredData.map((d) => d.id)))
    else setSelectedIds(new Set())
  }

  const toggleSelect = (id: string) => {
    const newSet = new Set(selectedIds)
    if (newSet.has(id)) newSet.delete(id)
    else newSet.add(id)
    setSelectedIds(newSet)
  }

  function handleEdit(taskId: string) {
    setSelectedTaskId(taskId)
    setIsTaskSheetOpen(true)
  }

  function handleCreate() {
    setSelectedTaskId(null)
    setIsTaskSheetOpen(true)
  }

  // ── Drag and Drop handlers (native HTML5 DnD) ──
  function handleDragStart(taskId: string) {
    setDraggedTaskId(taskId)
  }

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault() // wajib, supaya onDrop bisa jalan
  }

  function handleDrop(newStageDb: string) {
    if (!draggedTaskId) return

    const task = rawTasks.find((t: any) => t.id === draggedTaskId)
    if (task && task.stage !== newStageDb) {
      changeStage({ id: draggedTaskId, stage: newStageDb })
    }
    setDraggedTaskId(null)
  }

  if (isLoading) return <div className="p-margin">Loading tasks...</div>

  return (
    <div className="px-margin py-space-lg flex flex-col gap-space-lg max-w-[1440px] mx-auto w-full">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-md">
        <div className="flex items-center gap-space-md">
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">Content Database</h1>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-label-xs font-label-xs bg-surface-container-high text-on-surface-variant font-medium">
                {rawTasks.length} Total
              </span>
            </div>
            <p className="font-body-sm text-body-sm text-outline mt-0.5">Central media production catalog, release schedule, and asset stages</p>
          </div>
        </div>
        <div className="flex items-center gap-space-sm flex-wrap">
          <div className="inline-flex p-1 rounded-full bg-surface-container shadow-inner">
            <button onClick={() => setViewMode('KANBAN')} className={`flex items-center gap-1.5 px-3 py-1 rounded-full font-label-sm text-label-sm transition-all ${viewMode === 'KANBAN' ? 'bg-surface-container-lowest text-primary font-semibold shadow-sm' : 'text-on-surface-variant hover:text-on-surface'}`}>
              <span className="material-symbols-outlined text-[16px]">view_kanban</span>
              <span>Kanban</span>
            </button>
            <button onClick={() => setViewMode('TABLE')} className={`flex items-center gap-1.5 px-3 py-1 rounded-full font-label-sm text-label-sm transition-all ${viewMode === 'TABLE' ? 'bg-surface-container-lowest text-primary font-semibold shadow-sm' : 'text-on-surface-variant hover:text-on-surface'}`}>
              <span className="material-symbols-outlined text-[16px]">table_chart</span>
              <span>Table</span>
            </button>
          </div>
          <button onClick={handleCreate} className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-primary-container text-on-primary font-label-md text-label-md shadow-md hover:bg-primary transition-all active:scale-95">
            <span className="material-symbols-outlined text-[18px]">add</span>
            <span>New Item</span>
          </button>
        </div>
      </div>

      {/* Filter bar */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-space-sm bg-surface-container-lowest p-2.5 rounded-xl shadow-sm">
        <div className="flex flex-wrap items-center gap-2 flex-1">
          <div className="relative flex-1 min-w-[220px] max-w-md flex items-center">
            <span className="material-symbols-outlined absolute left-2.5 text-[18px] text-outline pointer-events-none">search</span>
            <input value={search} onChange={(e) => setSearch(e.target.value)} className="w-full h-9 pl-9 pr-8 bg-surface-container-low text-on-surface rounded-lg font-body-sm text-body-sm outline-none" placeholder="Filter by title..." type="text" />
          </div>
          <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} className="h-9 px-3 bg-surface-container-low text-on-surface font-label-sm text-label-sm rounded-lg outline-none">
            <option value="ALL">All Formats</option>
            <option value="VIDEO">Video Only</option>
            <option value="ARTICLE">Article Only</option>
          </select>
          <select value={stageFilter} onChange={(e) => setStageFilter(e.target.value)} className="h-9 px-3 bg-surface-container-low text-on-surface font-label-sm text-label-sm rounded-lg outline-none">
            <option value="ALL">All Production Stages</option>
            {STAGE_COLUMNS.map((s) => (
              <option key={s.dbValue} value={STAGE_DB_TO_UI[s.dbValue]}>{s.label}</option>
            ))}
          </select>
          <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className="h-9 px-3 bg-surface-container-low text-on-surface font-label-sm text-label-sm rounded-lg outline-none">
            <option value="ALL">All Categories</option>
            {categoryList.map((c: any) => (
              <option key={c.id} value={c.name}>{c.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* TABLE VIEW */}
      {viewMode === 'TABLE' && (
        <div className="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden flex flex-col">
          <div className="overflow-x-auto w-full">
            <table className="w-full text-left border-collapse min-w-240">
              <thead>
                <tr className="bg-surface-container-low/70 text-on-surface-variant font-label-xs text-label-xs uppercase">
                  <th className="py-3 px-4 w-12 text-center">
                    <input checked={selectedIds.size === filteredData.length && filteredData.length > 0} onChange={(e) => toggleSelectAll(e.target.checked)} type="checkbox" />
                  </th>
                  <th className="py-3 px-3 font-semibold">Title & Distribution</th>
                  <th className="py-3 px-3 font-semibold w-32">Format</th>
                  <th className="py-3 px-3 font-semibold w-40">Pipeline Stage</th>
                  <th className="py-3 px-3 font-semibold w-48">Target Release</th>
                  <th className="py-3 px-3 font-semibold w-36">Category</th>
                  <th className="py-3 px-4 font-semibold w-24 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="font-body-sm text-body-sm">
                {filteredData.map((item) => (
                  <tr key={item.id} className="group hover:bg-surface-container-low/60">
                    <td className={`px-4 text-center ${isCompact ? 'py-1.5' : 'py-3'}`}>
                      <input checked={selectedIds.has(item.id)} onChange={() => toggleSelect(item.id)} type="checkbox" />
                    </td>
                    <td className={`px-3 ${isCompact ? 'py-1.5' : 'py-3'}`}>
                      <span className="font-headline-sm text-headline-sm text-on-surface">{item.title}</span>
                    </td>
                    <td className={`px-3 ${isCompact ? 'py-1.5' : 'py-3'}`}>{item.type}</td>
                    <td className={`px-3 ${isCompact ? 'py-1.5' : 'py-3'}`}>{item.stage}</td>
                    <td className={`px-3 ${isCompact ? 'py-1.5' : 'py-3'}`}>{item.date}</td>
                    <td className={`px-3 ${isCompact ? 'py-1.5' : 'py-3'}`}>
                      <span className="px-2 py-0.5 rounded-md bg-surface-container text-on-surface-variant font-label-xs text-label-xs">{item.category}</span>
                    </td>
                    <td className={`px-4 text-right ${isCompact ? 'py-1.5' : 'py-3'}`}>
                      <button onClick={() => handleEdit(item.id)} className="p-1 rounded hover:bg-surface-container" title="Edit">
                        <span className="material-symbols-outlined text-[17px]">edit</span>
                      </button>
                      <button onClick={() => removeTask(item.id)} className="p-1 rounded hover:bg-surface-container" title="Delete">
                        <span className="material-symbols-outlined text-[17px]">delete</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* KANBAN VIEW dengan Drag and Drop */}
      {viewMode === 'KANBAN' && (
        <div className="w-full overflow-x-auto">
          <div className="flex items-start gap-space-md min-w-[1540px] pb-16">
            {STAGE_COLUMNS.map((col) => {
              const columnTasks = filteredData.filter((t) => t.stageDb === col.dbValue)
              return (
                <div
                  key={col.dbValue}
                  onDragOver={handleDragOver}
                  onDrop={() => handleDrop(col.dbValue)}
                  className="flex flex-col w-[300px] shrink-0 rounded-xl bg-surface-container-low p-2 gap-space-sm shadow-sm"
                >
                  <div className={`flex items-center justify-between px-3 py-2 rounded-lg ${col.bgClass} text-on-surface`}>
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${col.dotClass}`}></span>
                      <span className="font-headline-sm text-headline-sm">{col.label}</span>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-surface-container-lowest/80 font-label-xs text-label-xs font-semibold">
                      {columnTasks.length}
                    </span>
                  </div>

                  <div className="flex flex-col gap-space-sm min-h-[60px]">
                    {columnTasks.map((task) => (
                      <div
                        key={task.id}
                        draggable
                        onDragStart={() => handleDragStart(task.id)}
                        onClick={() => handleEdit(task.id)}
                        className="group relative flex flex-col gap-space-xs p-space-md rounded-lg bg-surface-container-lowest shadow-sm hover:shadow-md transition-all cursor-grab active:cursor-grabbing"
                      >
                        <div className="flex items-center justify-between gap-1">
                          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-tertiary-fixed text-on-tertiary-fixed font-label-xs text-label-xs font-semibold">
                            {task.type}
                          </span>
                          <span className="material-symbols-outlined text-[16px] text-outline opacity-40 group-hover:opacity-100">drag_indicator</span>
                        </div>
                        <h3 className="font-headline-sm text-headline-sm text-on-surface line-clamp-2 pt-1">{task.title}</h3>
                        <div className="flex items-center gap-1.5 pt-1 flex-wrap">
                          <span className="px-2 py-0.5 rounded bg-surface-container-high text-on-surface-variant font-label-xs text-label-xs">{task.category}</span>
                          {task.tags.map((tag: string) => (
                            <span key={tag} className="px-2 py-0.5 rounded bg-surface-container-high text-on-surface-variant font-label-xs text-label-xs">#{tag}</span>
                          ))}
                        </div>
                        <div className="flex items-center justify-between pt-3 text-on-surface-variant">
                          <div className="flex items-center gap-1 text-outline font-label-sm text-label-sm">
                            <span className="material-symbols-outlined text-[14px]">event</span>
                            <span>{task.date}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <button onClick={handleCreate} className="flex items-center justify-center gap-1.5 py-2 rounded-lg bg-surface-container-lowest/60 hover:bg-surface-container-lowest text-on-surface-variant hover:text-on-surface font-label-sm text-label-sm transition-colors mt-1">
                    <span className="material-symbols-outlined text-[16px]">add</span>
                    <span>Add {col.label}</span>
                  </button>
                </div>
              )
            })}
          </div>
        </div>
      )}

      <TaskSheet
        isOpen={isTaskSheetOpen}
        taskId={selectedTaskId}
        onClose={() => setIsTaskSheetOpen(false)}
      />
    </div>
  )
}