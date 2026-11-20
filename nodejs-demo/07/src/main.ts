import { TaskStore, delay } from './taskStore.ts'
import type { Task } from './types.ts'

const STATUS_LABEL: Record<Task['status'], string> = {
  todo: '待办',
  doing: '进行中',
  done: '已完成',
  id: 0
}

function printTasks(title: string, tasks: readonly Task[]): void {
  console.log(`\n${title}`)
  for (const task of tasks) {
    console.log(
      `  #${task.id} ${task.title.padEnd(12)} ${STATUS_LABEL[task.status]}  优先级 ${task.priority}`,
    )
  }
}

async function main(): Promise<void> {
  const store = new TaskStore()

  store.add({ title: '学习 Node', priority: 3 })
  store.add({ title: '学习 TS', priority: 3 })
  store.add({ title: '写示例代码', priority: 2 })

  store.updateStatus(1, 'doing')
  await delay(50) // 模拟异步任务
  store.updateStatus(1, 'done')

  printTasks('全部任务', store.all)
  printTasks('未完成任务', store.filterBy('status', 'todo'))

  console.log('\nNode 版本:', process.version)
  console.log('当前时间:', new Date().toLocaleString('zh-CN'))
}

main().catch((error: unknown) => {
  console.error('运行失败:', error)
  process.exitCode = 1
})
