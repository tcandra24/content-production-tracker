import { useForm } from '@tanstack/react-form'
import { categorySchema } from '#/lib/schemas/category'

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

const DEFAULT_FORM_VALUES = {
  name: '',
  slug: '',
  description: '',
  color: COLOR_PALETTES[0].hex,
  icon: AVAILABLE_ICONS[0].name,
  isActive: true,
}

function generateSlug(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export default function CategoryFormModal({
  category,
  onClose,
  onSubmitCreate,
  onSubmitUpdate,
  isSaving,
}: {
  category: Category | null
  onClose: () => void
  onSubmitCreate: (payload: any) => void
  onSubmitUpdate: (payload: any) => void
  isSaving: boolean
}) {
  const isEditMode = category !== null

  const form = useForm({
    defaultValues: isEditMode
      ? {
          name: category.name,
          slug: category.slug,
          description: category.description,
          color: category.color,
          icon: category.icon,
          isActive: category.status === 'ACTIVE',
        }
      : DEFAULT_FORM_VALUES,
    validators: {
      onSubmit: categorySchema,
    },
    onSubmit: async ({ value }) => {
      const basePayload = {
        name: value.name.trim(),
        slug: value.slug.trim() || generateSlug(value.name),
        description: value.description.trim() || undefined,
        color: value.color,
        icon: value.icon,
        isActive: value.isActive,
      }

      if (isEditMode) {
        onSubmitUpdate({ id: category.id, ...basePayload })
      } else {
        onSubmitCreate(basePayload)
      }
    },
  })

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-on-surface/40 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-lg bg-surface-container-lowest rounded-2xl shadow-2xl border border-surface-variant overflow-hidden flex flex-col">
        <div className="px-6 py-4 border-b border-surface-variant flex items-center justify-between bg-surface-container-low/40">
          <div className="flex items-center gap-2.5">
            <form.Subscribe selector={(state) => [state.values.color, state.values.icon]}>
              {([color, icon]) => (
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-white shadow-sm"
                  style={{ backgroundColor: color }}
                >
                  <span className="material-symbols-outlined text-[18px]">{icon}</span>
                </div>
              )}
            </form.Subscribe>
            <div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                {isEditMode ? 'Edit Category' : 'Create Category'}
              </h3>
              <p className="font-label-xs text-label-xs text-outline">
                {isEditMode
                  ? 'Update category properties and appearance'
                  : 'Define a new taxonomy grouping for production media'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-outline hover:text-on-surface hover:bg-surface-container transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault()
            e.stopPropagation()
            form.handleSubmit()
          }}
          className="p-6 space-y-4"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <form.Field name="name">
              {(field) => (
                <div className="space-y-1">
                  <label className="block font-label-sm text-label-sm text-on-surface font-medium" htmlFor={field.name}>
                    Category Name <span className="text-error">*</span>
                  </label>
                  <input
                    id={field.name}
                    name={field.name}
                    type="text"
                    placeholder="e.g. AI Workflows"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => {
                      field.handleChange(e.target.value)
                      if (!isEditMode) {
                        form.setFieldValue('slug', generateSlug(e.target.value))
                      }
                    }}
                    className="w-full h-10 px-3 bg-surface-container-low focus:bg-surface-container-lowest rounded-lg font-body-sm text-body-sm text-on-surface border border-surface-variant focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  />
                  {field.state.meta.errors.length > 0 && (
                    <p className="text-error text-xs">
                      {field.state.meta.errors.map((err: any) => err.message).join(', ')}
                    </p>
                  )}
                </div>
              )}
            </form.Field>

            <form.Field name="slug">
              {(field) => (
                <div className="space-y-1">
                  <label className="block font-label-sm text-label-sm text-on-surface font-medium" htmlFor={field.name}>
                    Slug Identifier
                  </label>
                  <div className="relative flex items-center">
                    <span className="absolute left-3 text-outline text-[13px] font-mono">#</span>
                    <input
                      id={field.name}
                      name={field.name}
                      type="text"
                      placeholder="ai-workflows"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className="w-full h-10 pl-7 pr-3 bg-surface-container-low focus:bg-surface-container-lowest rounded-lg font-mono text-[12px] text-on-surface border border-surface-variant focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    />
                  </div>
                  {field.state.meta.errors.length > 0 && (
                    <p className="text-error text-xs">
                      {field.state.meta.errors.map((err: any) => err.message).join(', ')}
                    </p>
                  )}
                </div>
              )}
            </form.Field>
          </div>

          <form.Field name="description">
            {(field) => (
              <div className="space-y-1">
                <label className="block font-label-sm text-label-sm text-on-surface font-medium" htmlFor={field.name}>
                  Description
                </label>
                <textarea
                  id={field.name}
                  name={field.name}
                  rows={2}
                  placeholder="Describe what content belongs in this category..."
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="w-full px-3 py-2 bg-surface-container-low focus:bg-surface-container-lowest rounded-lg font-body-sm text-body-sm text-on-surface border border-surface-variant focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
                />
                {field.state.meta.errors.length > 0 && (
                  <p className="text-error text-xs">
                    {field.state.meta.errors.map((err: any) => err.message).join(', ')}
                  </p>
                )}
              </div>
            )}
          </form.Field>

          <form.Field name="color">
            {(field) => (
              <div className="space-y-1.5">
                <label className="block font-label-sm text-label-sm text-on-surface font-medium" htmlFor={field.name}>
                  Theme Color
                </label>
                <div className="flex items-center gap-2 flex-wrap">
                  {COLOR_PALETTES.map((c) => (
                    <button
                      key={c.hex}
                      type="button"
                      onClick={() => field.handleChange(c.hex)}
                      className={`w-7 h-7 rounded-full transition-transform flex items-center justify-center ${
                        field.state.value === c.hex ? 'ring-2 ring-offset-2 ring-primary scale-110' : 'hover:scale-105'
                      }`}
                      style={{ backgroundColor: c.hex }}
                      title={c.name}
                    >
                      {field.state.value === c.hex && (
                        <span className="material-symbols-outlined text-white text-[14px]">check</span>
                      )}
                    </button>
                  ))}
                  <div className="flex items-center gap-1.5 ml-2">
                    <input
                      id={field.name}
                      name={field.name}
                      type="color"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className="w-7 h-7 rounded-lg border border-surface-variant cursor-pointer p-0 bg-transparent"
                      title="Custom color"
                    />
                    <span className="font-mono text-[11px] text-outline uppercase">{field.state.value}</span>
                  </div>
                </div>
                {field.state.meta.errors.length > 0 && (
                  <p className="text-error text-xs">
                    {field.state.meta.errors.map((err: any) => err.message).join(', ')}
                  </p>
                )}
              </div>
            )}
          </form.Field>

          <form.Field name="icon">
            {(field) => (
              <div className="space-y-1.5">
                <label className="block font-label-sm text-label-sm text-on-surface font-medium" htmlFor={field.name}>
                  Icon Representation
                </label>
                <div className="grid grid-cols-6 gap-2 max-h-36 overflow-y-auto p-1 bg-surface-container-low/50 rounded-xl border border-surface-variant/70">
                  {AVAILABLE_ICONS.map((ic) => (
                    <button
                      key={ic.name}
                      type="button"
                      onClick={() => field.handleChange(ic.name)}
                      className={`p-2 rounded-lg flex flex-col items-center gap-1 transition-all ${
                        field.state.value === ic.name
                          ? 'bg-surface-container-lowest text-primary shadow-sm ring-1 ring-primary/40 font-semibold'
                          : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[20px]">{ic.name}</span>
                      <span className="text-[10px] truncate max-w-12.5">{ic.label}</span>
                    </button>
                  ))}
                </div>
                {field.state.meta.errors.length > 0 && (
                  <p className="text-error text-xs">
                    {field.state.meta.errors.map((err: any) => err.message).join(', ')}
                  </p>
                )}
              </div>
            )}
          </form.Field>

          <form.Field name="isActive">
            {(field) => (
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
                    onClick={() => field.handleChange(!field.state.value)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      field.state.value ? 'bg-primary-container' : 'bg-surface-container-highest'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        field.state.value ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                  <span className="font-label-xs text-label-xs font-semibold text-on-surface">
                    {field.state.value ? 'ACTIVE' : 'ARCHIVED'}
                  </span>
                </div>
              </div>
            )}
          </form.Field>

          <form.Subscribe selector={(state) => [state.canSubmit]}>
            {([canSubmit]) => (
              <div className="pt-4 border-t border-surface-variant flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-lg font-label-md text-label-md text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!canSubmit || isSaving}
                  className="px-5 py-2 rounded-lg font-label-md text-label-md bg-primary-container text-on-primary shadow-sm hover:bg-primary transition-all active:scale-[0.99] disabled:opacity-60"
                >
                  {isSaving ? 'Saving...' : isEditMode ? 'Save Changes' : 'Create Category'}
                </button>
              </div>
            )}
          </form.Subscribe>
        </form>
      </div>
    </div>
  )
}