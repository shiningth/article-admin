import { ConfigDrawer } from '@/components/config-drawer'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { ImageModeSwitch } from '@/components/image-mode-switch.tsx'
import TaskManager from '@/features/tasks/components/task-manager.tsx'

export function Tasks() {
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

      <Main fixed>
        <div className='flex flex-wrap items-end justify-between gap-2 mb-2'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>天机轮转</h2>
            <p className='text-muted-foreground text-sm'>以天时为引，驱动诸阵自行运转，万事各归其序</p>
          </div>
        </div>
        <TaskManager/>
      </Main>
    </>


  )
}
