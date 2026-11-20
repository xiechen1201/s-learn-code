import type { NewTask, Task, TaskStatus } from './types.ts'

/** 泛型容器：Node + TS 里最常见的“带类型的双端队列” */
export class TaskStore {
  private tasks: Task[] = []
  private seq = 0

  add(input: NewTask): Task {
    const task: Task = {
      id: ++this.seq,
      title: input.title,
      status: 'todo',
      priority: input.priority,
      createdAt: new Date(),
    }
    this.tasks.push(task)
    return task
  }

  updateStatus(id: number, status: TaskStatus): Task | undefined {
    const task = this.tasks.find((t) => t.id === id)
    if (task) task.status = status
    return task
  }

  filterBy<K extends keyof Task>(key: K, value: Task[K]): Task[] {
    return this.tasks.filter((task) => task[key] === value)
  }

  get all(): readonly Task[] {
    return this.tasks
  }
}

/** 模拟一次异步 IO，演示 Promise + 类型收窄 */
export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
