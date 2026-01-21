import { ConfigDrawer } from '@/components/config-drawer.tsx'
import { Header } from '@/components/layout/header.tsx'
import { Main } from '@/components/layout/main.tsx'
import { Search } from '@/components/search.tsx'
import { ThemeSwitch } from '@/components/theme-switch.tsx'
import { ImageModeSwitch } from '@/components/image-mode-switch.tsx'
import { TaskLogTable } from '@/features/tasks/log/task-log.tsx'

export function TaskLog() {
  return (
    <>
      <Header fixed>
        <Search />
        <div className='ms-auto flex items-center space-x-4'>
          <ImageModeSwitch/>
          <ThemeSwitch />
          <ConfigDrawer />
        </div>
      </Header>

      <Main className='flex flex-1 flex-col gap-4 sm:gap-6'>
        <div className='flex flex-wrap items-end justify-between gap-2'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>任务调度记录</h2>
            <p className='text-muted-foreground'>
             查看任务执行结果
            </p>
          </div>
        </div>
        <TaskLogTable/>
      </Main>
    </>


  )
}
