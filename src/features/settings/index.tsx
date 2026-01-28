import { Outlet } from '@tanstack/react-router'
import { Bell, Download, UserPen, Settings2, Route, Cog } from 'lucide-react'
import { ConfigDrawer } from '@/components/config-drawer'
import { ImageModeSwitch } from '@/components/image-mode-switch.tsx'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { TopNav } from '@/features/settings/components/top-nav.tsx'

const sidebarNavItems = [
  {
    title: '身份印记',
    href: '/settings',
    icon: <UserPen size={18} />,
  },
  {
    title: '万物流向',
    href: '/settings/rule',
    icon: <Route size={18} />,
  },
  {
    title: '灵器配置',
    href: '/settings/downloader',
    icon: <Download size={18} />,
  },
  {
    title: '灵音通道',
    href: '/settings/notifications',
    icon: <Bell size={18} />,
  },
  {
    title: '阵基细则',
    href: '/settings/system',
    icon: <Cog size={18} />,
  },
]

export function Settings() {
  return (
    <>
      {/* ===== Top Heading ===== */}
      <Header fixed>
        <Search />
        <div className='ms-auto flex items-center space-x-4'>
          <ImageModeSwitch />
          <ThemeSwitch />
          <ConfigDrawer />
        </div>
      </Header>

      <Main fixed>
        <div className='flex h-full flex-col overflow-hidden'>
          <div className='sticky top-0 z-30 mb-2'>
            <div className='mb-8'>
              <div className='mb-2 flex items-center gap-3'>
                <Settings2 className='h-8 w-8 text-primary' />
                <h1 className='text-3xl font-bold'>法宝中枢</h1>
              </div>
              <p className='text-muted-foreground text-sm'>
                统御诸般法宝、传讯阵法等核心要素
              </p>
            </div>
            <TopNav items={sidebarNavItems} />
          </div>
          <div className='flex-1 overflow-auto'>
            <Outlet />
          </div>
        </div>
      </Main>
    </>
  )
}
