import { ConfigDrawer } from '@/components/config-drawer'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { ImageModeSwitch } from '@/components/image-mode-switch.tsx'
import TokenManager from '@/features/tokens/token-manager.tsx'

export function Tokens() {
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
            <h2 className='text-2xl font-bold tracking-tight'>宗门令符</h2>
            <p className='text-muted-foreground text-sm'>令符可授外界法器通行之权，用以调用宗门术法</p>
          </div>
        </div>
        <TokenManager/>
      </Main>
    </>


  )
}
