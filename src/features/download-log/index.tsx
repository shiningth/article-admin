import { ConfigDrawer } from '@/components/config-drawer'
import { ImageModeSwitch } from '@/components/image-mode-switch.tsx'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { DownloadLogTable } from '@/features/download-log/download-table.tsx'

export function DownloadLog() {
  return (
    <>
      <Header fixed>
        <Search />
        <div className='ms-auto flex items-center space-x-4'>
          <ImageModeSwitch />
          <ThemeSwitch />
          <ConfigDrawer />
        </div>
      </Header>

      <Main fixed>
        <div className='flex flex-wrap items-end justify-between gap-2 mb-2'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>战果回录</h2>
            <p className='text-muted-foreground text-sm'>所有已取回之物，皆载于此</p>
          </div>
        </div>
        <DownloadLogTable />
      </Main>
    </>
  )
}
