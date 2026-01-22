import { ScrollArea } from '@/components/ui/scroll-area'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import type { ArticleFilter, Category } from '@/api/article.ts'

interface FilterBarProps {
  value: ArticleFilter
  categories: Category[]
  onChange: (v: ArticleFilter) => void
}

export function FilterBar({ value, categories, onChange }: FilterBarProps) {
  return (
    <ScrollArea className='mb-2 w-full' type='hover' orientation='horizontal'>
      <Tabs
        value={value.category || 'all'}
        onValueChange={(v) =>
          onChange({ ...value, category: v === 'all' ? '' : v })
        }
      >
        <TabsList>
          <TabsTrigger value='all'>全部</TabsTrigger>
          {categories.map((c) => (
            <TabsTrigger key={c.category} value={c.category}>
              {c.category}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </ScrollArea>
  )
}
