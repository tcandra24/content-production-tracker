import { z } from 'zod'

export const taskSchema = z.object({
  title: z.string().min(10, 'Title must at least 10 character').max(150, 'Title must be at moth 150 character'),
  categoryId: z.string().uuid('Category wajib dipilih'),
  contentType: z.enum(['article', 'video']),
  stage: z.enum(['idea', 'scripting', 'production', 'editing', 'published']),
  deadline: z.coerce.date().optional(),
  notes: z.string().optional(),
  tagNames: z.array(z.string().min(1)).optional().default([])
})

export const updateTaskSchema = taskSchema.partial().extend({
  id: z.string().uuid('ID not valid'),
})

export const updateStageSchema = taskSchema.pick({ stage: true }).extend({
  id: z.string().uuid('ID not valid'),
})

export const deleteTaskSchema = z.object({
  id: z.string().uuid('ID not valid'),
})

export type taskFormValue = z.infer<typeof taskSchema>
export type updateTaskFormValue = z.infer<typeof updateTaskSchema>
export type updateStageFormValue = z.infer<typeof updateStageSchema>
export type deleteTaskFormValue = z.infer<typeof deleteTaskSchema>
