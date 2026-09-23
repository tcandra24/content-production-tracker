import { z } from 'zod'

export const categorySchema = z.object({
  name: z.string().min(10, 'Title must at least 10 character').max(100, 'Title must be at most 100 character'),
  slug: z.string().min(10, 'Title must at least 10 character').max(100, 'Title must be at most 100 character'),
  description: z.string().max(300).optional(), 
  color: z.string().max(20, 'Title must be at most 20 character'),
  icon: z.string().max(100, 'Title must be at most 100 character'),
  isActive: z.boolean().optional().default(true),
})

export const updateCategorySchema = categorySchema.partial().extend({
  id: z.string().uuid('ID not valid'),
})

export const deleteCategorySchema = z.object({
  id: z.string().uuid('ID not valid'),
})

export type categoryFormValue = z.infer<typeof categorySchema>
export type updateCategoryFormValue = z.infer<typeof updateCategorySchema>
export type deleteCategoryFormValue = z.infer<typeof deleteCategorySchema>
