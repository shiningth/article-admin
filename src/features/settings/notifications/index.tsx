import { Bell } from 'lucide-react'
import { ContentSection } from '../components/content-section'
import { NotificationsForm } from './notifications-form'

export function SettingsNotifications() {
  return (
    <ContentSection
      title='灵音通道'
      desc='跨界传讯之径，实时回响阵法运转'
      icon={<Bell size={18} />}
    >
      <NotificationsForm />
    </ContentSection>
  )
}
