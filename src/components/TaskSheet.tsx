import { useState, useEffect } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { createTask, updateTask, deleteTask, getTaskById } from '#/server/function/tasks'
import { getCategories } from '#/server/function/categories'

interface TaskSheetProps {
  isOpen: boolean
  taskId: string | null // null = mode create
  onClose: () => void
}

const STAGE_OPTIONS = [
  { value: 'idea', label: 'Idea', dotClass: 'bg-[#D97706]', bgClass: 'bg-[#FEF3C7]/50' },
  { value: 'scripting', label: 'Scripting', dotClass: 'bg-[#2563EB]', bgClass: 'bg-[#DBEAFE]/50' },
  { value: 'production', label: 'Recording / Writing', dotClass: 'bg-[#EA580C]', bgClass: 'bg-[#FED7AA]/50' },
  { value: 'editing', label: 'Editing & Grading', dotClass: 'bg-[#9333EA]', bgClass: 'bg-[#E9D5FF]/50' },
  { value: 'published', label: 'Published', dotClass: 'bg-[#059669]', bgClass: 'bg-[#D1FAE5]/50' },
]

export default function TaskSheet({ isOpen, taskId, onClose }: TaskSheetProps) {
  const queryClient = useQueryClient()
  const isEditMode = taskId !== null

  // ── Fetch data pendukung ──
  const { data: categoriesData } = useQuery({
    queryKey: ['categories'],
    queryFn: () => getCategories(),
    enabled: isOpen,
  })
  const categoryList = categoriesData?.categories ?? []

  const { data: existingTaskData } = useQuery({
    queryKey: ['task', taskId],
    queryFn: () => getTaskById({ data: taskId! }),
    enabled: isEditMode && isOpen,
  })

  // ── Form state ──
  const [title, setTitle] = useState('')
  const [contentType, setContentType] = useState<'video' | 'article'>('video')
  const [stage, setStage] = useState('idea')
  const [categoryId, setCategoryId] = useState('')
  const [deadline, setDeadline] = useState('') // format yyyy-mm-dd untuk <input type="date">
  const [notes, setNotes] = useState('')
  const [tagNames, setTagNames] = useState<string[]>([])
  const [tagInput, setTagInput] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  // Isi form saat data edit didapat, atau reset saat mode create / sheet ditutup
  useEffect(() => {
    if (!isOpen) return

    if (isEditMode && existingTaskData?.task) {
      const task = existingTaskData.task
      setTitle(task.title)
      setContentType(task.contentType)
      setStage(task.stage)
      setCategoryId(task.categoryId ?? '')
      setDeadline(task.deadline ? new Date(task.deadline).toISOString().slice(0, 10) : '')
      setNotes(task.notes ?? '')
      setTagNames(task.taskTags?.map((tt: any) => tt.tag.name) ?? [])
    } else if (!isEditMode) {
      setTitle('')
      setContentType('video')
      setStage('idea')
      setCategoryId('')
      setDeadline('')
      setNotes('')
      setTagNames([])
    }
    setErrorMessage('')
  }, [isOpen, isEditMode, existingTaskData])

  // ── Mutations ──
  const { mutate: submitCreate, isPending: isCreating } = useMutation({
    mutationFn: (payload: any) => createTask({ data: payload }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
      onClose()
    },
    onError: (err: any) => setErrorMessage(err.message || 'Gagal menyimpan task'),
  })

  const { mutate: submitUpdate, isPending: isUpdating } = useMutation({
    mutationFn: (payload: any) => updateTask({ data: payload }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
      onClose()
    },
    onError: (err: any) => setErrorMessage(err.message || 'Gagal menyimpan task'),
  })

  const { mutate: submitDelete, isPending: isDeleting } = useMutation({
    mutationFn: () => deleteTask({ data: { id: taskId! } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
      onClose()
    },
  })

  const isSaving = isCreating || isUpdating

  function addTag() {
    const value = tagInput.trim().replace(/^#/, '')

    if (value && !tagNames.includes(value)) {
      setTagNames([...tagNames, value])
    }
    setTagInput('')
  }

  function removeTag(name: string) {
    setTagNames(tagNames.filter((t) => t !== name))
  }

  function handleSave() {
    setErrorMessage('')

    if (!title.trim()) {
      setErrorMessage('Judul wajib diisi')
      return
    }
    if (!categoryId) {
      setErrorMessage('Kategori wajib dipilih')
      return
    }

    const payload = {
      title: title.trim(),
      categoryId,
      contentType,
      stage,
      deadline: deadline ? new Date(deadline) : undefined,
      notes: notes.trim() || undefined,
      tagNames,
    }

    if (isEditMode) {
      submitUpdate({ id: taskId, ...payload })
    } else {
      submitCreate(payload)
    }
  }

  function handleDelete() {
    if (!isEditMode) return
    submitDelete()
  }

  if (!isOpen) return null

  const activeStage = STAGE_OPTIONS.find((s) => s.value === stage) ?? STAGE_OPTIONS[0]

  return (
    <>
      <div className="fixed inset-0 bg-[#1c1c1a]/40 backdrop-blur-[3px] z-50 transition-opacity duration-300" onClick={onClose}></div>

      <aside className="fixed top-0 right-0 bottom-0 w-full sm:w-[540px] bg-surface-container-lowest z-50 shadow-2xl flex flex-col justify-between transition-transform duration-300 translate-x-0 animate-slide-in-right">
        <div className="sticky top-0 bg-surface-container-lowest/95 backdrop-blur-md px-space-lg py-4 flex flex-col gap-2 z-20 shadow-[0_1px_4px_rgba(0,0,0,0.03)]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-on-surface-variant font-label-sm text-label-sm">
              <span className="material-symbols-outlined text-[16px] text-outline">view_kanban</span>
              <span onClick={onClose} className="hover:text-on-surface cursor-pointer">Content Pipeline</span>
              {isEditMode && (
                <>
                  <span className="text-outline-variant">/</span>
                  <span className="font-medium text-primary flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                    {activeStage.label}
                  </span>
                </>
              )}
            </div>
            <button onClick={onClose} aria-label="Close drawer" className="w-8 h-8 rounded flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors">
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>
          <div className="flex items-center justify-between pt-1">
            <h2 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
              {isEditMode ? 'Edit Production Asset' : 'New Production Asset'}
            </h2>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-space-lg py-space-md flex flex-col gap-6">
          {errorMessage && (
            <div className="px-3 py-2 rounded-lg bg-error-container/30 text-error font-label-sm text-label-sm">
              {errorMessage}
            </div>
          )}

          {/* Title */}
          <div className="flex flex-col gap-1.5">
            <label className="font-label-xs text-label-xs uppercase tracking-wider text-outline font-semibold" htmlFor="task-title-input">
              Asset Headline / Title
            </label>
            <input
              className="w-full px-3 py-2 bg-surface-container-lowest rounded-lg font-headline-md text-headline-md text-on-surface shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/20 placeholder:text-outline/40 transition-shadow"
              id="task-title-input"
              placeholder="Enter production title..."
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* Format Type */}
          <div className="flex flex-col gap-2">
            <span className="font-label-xs text-label-xs uppercase tracking-wider text-outline font-semibold">Format Type</span>
            <div className="grid grid-cols-2 gap-2 p-1 bg-surface-container-low rounded-xl">
              <button
                type="button"
                onClick={() => setContentType('video')}
                className={`flex items-center justify-center gap-2 py-2 px-3 rounded-lg transition-all ${
                  contentType === 'video' ? 'bg-tertiary-fixed text-tertiary shadow-sm' : 'text-on-surface-variant hover:bg-surface-container-lowest'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">videocam</span>
                <span className="font-label-md text-label-md font-semibold">Video</span>
              </button>
              <button
                type="button"
                onClick={() => setContentType('article')}
                className={`flex items-center justify-center gap-2 py-2 px-3 rounded-lg transition-all ${
                  contentType === 'article' ? 'bg-secondary-container text-secondary shadow-sm' : 'text-on-surface-variant hover:bg-surface-container-lowest'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">article</span>
                <span className="font-label-md text-label-md font-semibold">Article / Essay</span>
              </button>
            </div>
          </div>

          {/* Stage & Category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
            <div className="flex flex-col gap-1.5">
              <label className="font-label-xs text-label-xs uppercase tracking-wider text-outline font-semibold">Current Stage</label>
              <select
                value={stage}
                onChange={(e) => setStage(e.target.value)}
                className={`w-full px-3 py-2 rounded-lg font-label-md text-label-md shadow-sm outline-none transition-colors ${activeStage.bgClass}`}
              >
                {STAGE_OPTIONS.map((s) => (
                  <option key={s.value} value={s.value}>{s.label}</option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-label-xs text-label-xs uppercase tracking-wider text-outline font-semibold">Category</label>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="w-full px-3 py-2 bg-surface-container-lowest rounded-lg font-label-md text-label-md shadow-sm outline-none"
              >
                <option value="" disabled>Select category</option>
                {categoryList.map((c: any) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Target Release */}
          <div className="flex flex-col gap-1.5">
            <label className="font-label-xs text-label-xs uppercase tracking-wider text-outline font-semibold">Target Release</label>
            <input
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="px-3 py-2 bg-surface-container-lowest rounded-lg shadow-sm font-label-md text-label-md text-on-surface outline-none"
            />
          </div>

          {/* Tags */}
          <div className="flex flex-col gap-1.5">
            <label className="font-label-xs text-label-xs uppercase tracking-wider text-outline font-semibold">Meta Tags</label>
            <div className="flex flex-wrap items-center gap-1.5 p-2 bg-surface-container-lowest rounded-lg shadow-sm">
              {tagNames.map((tag) => (
                <div key={tag} className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary-fixed text-on-primary-fixed text-label-xs font-label-xs font-medium">
                  <span>#{tag}</span>
                  <button type="button" onClick={() => removeTag(tag)} className="hover:text-error flex items-center justify-center">
                    <span className="material-symbols-outlined text-[14px]">close</span>
                  </button>
                </div>
              ))}
              <input
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ',') {
                    e.preventDefault()
                    addTag()
                  }
                }}
                placeholder="Add tag, press Enter..."
                className="flex-1 min-w-[100px] bg-transparent outline-none font-label-xs text-label-xs px-1"
              />
            </div>
          </div>

          {/* Notes */}
          <div className="flex flex-col gap-1.5">
            <label className="font-label-xs text-label-xs uppercase tracking-wider text-outline font-semibold" htmlFor="script-notes">
              Structured Script & Production Notes
            </label>
            <div className="relative rounded-lg shadow-sm bg-surface-container-lowest overflow-hidden">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-surface-container-low text-on-surface-variant font-label-xs text-label-xs border-b border-surface-variant">
                <span className="font-mono text-[11px] text-outline">Markdown supported</span>
              </div>
              <textarea
                className="w-full px-3 py-2.5 font-body-sm text-body-sm text-on-surface focus:outline-none placeholder:text-outline/50 font-mono resize-y"
                id="script-notes"
                placeholder="Structure your hook, timecodes, and B-roll wishlist..."
                rows={9}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="sticky bottom-0 bg-surface-container-lowest px-space-lg py-3.5 flex items-center justify-between shadow-[0_-2px_8px_rgba(0,0,0,0.04)] z-20">
          {isEditMode ? (
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="flex items-center justify-center w-9 h-9 rounded-lg text-outline hover:text-error hover:bg-error-container/20 transition-colors"
              title="Delete asset from pipeline"
              type="button"
            >
              <span className="material-symbols-outlined text-[20px]">delete</span>
            </button>
          ) : (
            <div />
          )}
          <div className="flex items-center gap-2.5">
            <button onClick={onClose} className="px-4 py-2 rounded-lg bg-surface-container-lowest hover:bg-surface-container text-[#6B6862] hover:text-on-surface font-label-md text-label-md font-medium shadow-sm transition-all active:scale-95" type="button">
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="flex items-center gap-1.5 px-5 py-2 rounded-lg bg-primary-container hover:bg-[#4338CA] text-on-primary font-label-md text-label-md font-medium shadow-sm active:scale-98 transition-all min-w-[140px] justify-center"
              type="button"
            >
              {isSaving ? (
                <>
                  <span className="material-symbols-outlined text-[17px] animate-spin">sync</span>
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-[17px]">check</span>
                  <span>Save Changes</span>
                </>
              )}
            </button>
          </div>
        </div>
      </aside>
    </>
  )
}