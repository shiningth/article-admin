import { ContentSection } from '@/features/settings/components/content-section.tsx'
import { DownloaderForm } from '@/features/settings/downloader/downloader-form.tsx'
import { Download } from 'lucide-react'

export function SettingsDownloader() {
  return (
    <ContentSection title='灵器配置' desc='法器运转根基与归藏之地' icon={<Download className='h-5 w-5 text-primary' />}>
      <DownloaderForm />
    </ContentSection>
  )
}
