import { createServerFn } from "@tanstack/react-start";
import { getRequestHeaders } from '@tanstack/react-start/server'
import { and, desc, eq, inArray } from 'drizzle-orm'
import { db } from '#/db/index'
import { auth } from "#/lib/auth";
import { tasks, tags, taskTags } from "#/db/schema";
import { taskSchema, updateTaskSchema, updateStageSchema, deleteTaskSchema } from "#/lib/schemas/task";

async function getOrCreateTags(tagNames: string[]) {
  if (tagNames.length === 0) return []

  await db.insert(tags).values(tagNames.map((name) => ({ name }))).onConflictDoNothing({ target: tags.name })

  const rows = await db.select().from(tags).where(inArray(tags.name, tagNames))
  return rows
}

async function requireSession() {
  const session = await auth.api.getSession({ headers: getRequestHeaders() })
  if (!session) throw new Error('Unauthorized')
  return session
}

export const getTasks = createServerFn({ method: 'GET' }).handler(async () => {
  const session = await requireSession()

  const listTasks = await db.query.tasks.findMany({
    where: eq(tasks.userId, session.user.id),
    with: {
      category: true,
      taskTags: {
        with: {
          tag: true
        }
      }
    },
    orderBy: [desc(tasks.createdAt)]
  })

  return {
    success: true,
    message: "Tasks retrieved successfully",
    tasks: listTasks,
  };
})

export const getTaskById = createServerFn({ method: 'GET' })
.validator((id: unknown) => {
  if (typeof id !== 'string') throw new Error('invalid Id')
  return id
}).handler(async ({ data: id }) => {
  const session = await requireSession()

  const task = await db.query.tasks.findFirst({
    where: and(eq(tasks.id, id), eq(tasks.userId, session.user.id)),
    with: {
      category: true,
      taskTags: { with: { tag: true } }
    }
  })

  if (!task) throw new Error('Task not found')

  return {
    success: true,
    message: "Task retrieved successfully",
    task,
  };
})

export const createTask = createServerFn({ method: 'POST' })
  .validator((data: unknown) => taskSchema.parse(data))
  .handler(async ({ data }) => {
    const session = await requireSession()
    const { tagNames, ...taskData } = data

    const [task] = await db.insert(tasks).values({ ...taskData, userId: session.user.id }).returning()

    try {
      const tagRows = await getOrCreateTags(tagNames)
      if (tagRows.length > 0) {
        await db.insert(taskTags).values(tagRows.map((tag) => ({ taskId: task.id, tagId: tag.id })))
      }
    } catch (err) {
      // Compensating rollback — hapus task yang sudah terlanjur dibuat kalau insert tags gagal
      await db.delete(tasks).where(eq(tasks.id, task.id))
      throw err
    }

    return { 
      success: true, 
      message: 'Task created successfully', 
      task 
    }
  })

export const updateTask = createServerFn({ method: 'POST' })
  .validator((data: unknown) => updateTaskSchema.parse(data))
  .handler(async ({ data }) => {
    const session = await requireSession()
    const { id, tagNames, ...taskData } = data

    const existing = await db.query.tasks.findFirst({
      where: and(eq(tasks.id, id), eq(tasks.userId, session.user.id)),
    })
    if (!existing) throw new Error('Task not found')

    const [updated] = await db
      .update(tasks)
      .set({ ...taskData, updatedAt: new Date() })
      .where(eq(tasks.id, id))
      .returning()

    if (tagNames) {
      await db.delete(taskTags).where(eq(taskTags.taskId, id))
      const tagRows = await getOrCreateTags(tagNames)
      if (tagRows.length > 0) {
        await db.insert(taskTags).values(tagRows.map((tag) => ({ taskId: id, tagId: tag.id })))
      }
    }

    return { 
      success: true, 
      message: 'Task updated successfully', 
      task: updated 
    }
  })

export const updateTaskStage = createServerFn({ method: 'POST' })
  .validator(( data: unknown ) => updateStageSchema.parse(data))
  .handler(async ({ data }) => {
    const session = await requireSession()
    const { id, stage } = data

    const existing = await db.query.tasks.findFirst({
      where: and(eq(tasks.id, id), eq(tasks.userId, session.user.id))
    })
    if(!existing) throw new Error('Task not found')

    const [ updated ] = await db.update(tasks).set({ stage }).where(eq(tasks.id, id)).returning()

    return {
      success: true,
      message: "Task updated successfully",
      task: updated,
    };
  })

export const deleteTask = createServerFn({ method: 'POST' })
  .validator((id: unknown) => deleteTaskSchema.parse(id))
  .handler(async ({ data }) => {
    const { id } = data
    const session = await requireSession()
    
    const existing = await db.query.tasks.findFirst({
      where: and(eq(tasks.id, id), eq(tasks.userId, session.user.id))
    })
    if(!existing) throw new Error('Task not found')

    await db.delete(tasks).where(eq(tasks.id, id))

    return {
      success: true,
      message: "Task deleted successfully",
    };
  })

