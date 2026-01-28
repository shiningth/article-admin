import { ContentSection } from '@/features/settings/components/content-section.tsx'
import { SystemConfigForm } from '@/features/settings/system/system-config-form.tsx'
import { Cog } from 'lucide-react'

export function SettingsSystem() {
  return (
    <ContentSection
      title='阵基细则'
      desc='不属主脉亦影响全局'
      icon={<Cog className='h-5 w-5 text-primary' />}
    >
      <SystemConfigForm />
    </ContentSection>
  )
}
