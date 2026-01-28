import { ContentSection } from '@/features/settings/components/content-section.tsx'
import { Route } from 'lucide-react'
import RulesManager from '@/features/settings/rule/rule-manager.tsx'

export function SettingsRule() {
  return (
    <ContentSection title='万物流向' desc='一经立定，诸物各循其路' icon={<Route className='h-5 w-5 text-primary' />}>
      <RulesManager />
    </ContentSection>
  )
}
