import { ScrollArea } from '@/components/ui/scroll-area'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import type { ArticleFilter, Section } from '@/api/article.ts'
import { Button } from '@/components/ui/button.tsx'
import { useRef } from 'react'

interface FilterBarProps {
  value: ArticleFilter
  categories: Section[]
  onChange: (v: ArticleFilter) => void
  onImport?: (file: File) => void
}

export function FilterBar({ value, categories, onChange,onImport }: FilterBarProps) {
  const fileRef = useRef<HTMLInputElement>(null)
  return (
    <div className='flex items-center gap-2'>
      <ScrollArea className='mb-2 w-full' type='hover' orientation='horizontal'>
        <Tabs
          value={value.section || 'all'}
          onValueChange={(v) =>
            onChange({ ...value, section: v === 'all' ? '' : v })
          }
        >
          <TabsList>
            <TabsTrigger value='all'>全部</TabsTrigger>
            {categories.map((c) => (
              <TabsTrigger key={c.name} value={c.name}>
                {c.name}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </ScrollArea>
      {onImport && (
        <>
          <Button
            type="button"
            size="sm"
            className="bg-green-600 hover:bg-green-700 text-white"
            onClick={() => fileRef.current?.click()}
          >
            注入灵力
          </Button>

          <input
            ref={fileRef}
            type="file"
            hidden
            accept=".xls,.xlsx,.csv"
            onChange={(e) => {
              const file = e.currentTarget.files?.[0]
              if (!file) return
              onImport?.(file)
              e.currentTarget.value = ''
            }}
          />
        </>
      )}
    </div>
  )
}
