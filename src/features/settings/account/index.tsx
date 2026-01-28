import { ContentSection } from '../components/content-section'
import { AccountForm } from './account-form'
import { UserPen } from 'lucide-react'

export function SettingsAccount() {
  return (
    <ContentSection
      title='身份印记'
      desc='身份凭证与本命信息'
      icon={<UserPen className='h-5 w-5 text-primary' />}
    >
      <AccountForm />
    </ContentSection>
  )
}
