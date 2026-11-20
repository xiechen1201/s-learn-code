export type TaskStatus = 'todo' | 'doing' | 'done'

export interface Task {
  id: number
  title: string
  status: TaskStatus
  priority: 1 | 2 | 3
  createdAt: Date
}

export type NewTask = Pick<Task, 'title' | 'priority'>
