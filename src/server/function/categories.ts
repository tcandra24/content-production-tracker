import { createServerFn } from "@tanstack/react-start";
import { getRequestHeaders } from '@tanstack/react-start/server'
import { sql, desc, eq } from 'drizzle-orm'
import { db } from '#/db/index'
import { auth } from "#/lib/auth";
import { categories, tasks } from "#/db/schema";
import { categorySchema, updateCategorySchema, deleteCategorySchema } from "#/lib/schemas/category";

async function requireSession() {
  const session = await auth.api.getSession({ headers: getRequestHeaders() })
  if (!session) throw new Error('Unauthorized')
  return session
}

export const getCategories = createServerFn({ method: 'GET' }).handler(async () => {
  await requireSession()

  const result = await db
    .select({
      id: categories.id,
      name: categories.name,
      slug: categories.slug,
      description: categories.description,
      color: categories.color,
      icon: categories.icon,
      isActive: categories.isActive,
      createdAt: categories.createdAt,
      itemCount: sql<number>`count(${tasks.id})::int`,
    })
    .from(categories)
    .leftJoin(tasks, eq(tasks.categoryId, categories.id))
    .groupBy(categories.id)
    .orderBy(desc(categories.createdAt))

  return {
    success: true,
    message: 'Categories retrieved successfully',
    categories: result,
  }
})

export const createCategory = createServerFn({ method: 'POST' })
  .validator(( data: unknown ) => categorySchema.parse(data))
  .handler(async ({ data }) => {
    await requireSession()
    const { ...categoryData } = data

    const [ newCategory ] = await db.insert(categories).values(categoryData).returning()

    return { 
      success: true,
      message: "Category created successfully",
      category: newCategory
    }

  })

export const updateCategory = createServerFn({ method: 'POST' })
  .validator((data:unknown) => updateCategorySchema.parse(data))
  .handler(async ({ data }) => {
    await requireSession()
    const {id, ...categoryData} = data

    const existing = await db.query.categories.findFirst({
      where: eq(categories.id, id)
    })
    if (!existing) throw new Error('Category not found')

    const [ updated ] = await db.update(categories).set({
      ...categoryData, updatedAt: new Date()
    }).where(eq(categories.id, id)).returning()

    return {
      success: true,
      message: "Category updated successfully",
      category: updated
    }
  })

export const deleteCategory = createServerFn({ method: 'POST' })
  .validator((data: unknown) => deleteCategorySchema.parse(data))
  .handler(async ({ data }) => {
    await requireSession()
    const { id } = data

    const existing = await db.query.categories.findFirst({
      where: eq(categories.id, id)
    })
    if (!existing) throw new Error('Category not found')

    await db.delete(categories).where(eq(categories.id, id));

    return {
      success: true,
      message: "Category deleted successfully"
    }
  })