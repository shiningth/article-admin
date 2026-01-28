import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { toast } from 'sonner'
import { getArticles, getCategories, uploadArticle } from '@/api/article.ts'
import { useSearch } from '@/context/search-provider.tsx'
import { useDebounce } from '@/hooks/use-debounce.tsx'
import { Progress } from '@/components/ui/progress.tsx'
import { EmptyState } from '@/components/empty.tsx'
import { Loading } from '@/components/loading.tsx'
import { CommonPagination } from '@/components/pagination.tsx'
import { ArticleCard } from '@/features/articles/components/article-card.tsx'
import { FilterBar } from '@/features/articles/components/filter-bar.tsx'

export function ArticlesDesktop() {
  const { keyword } = useSearch()
  const debouncedKeyword = useDebounce(keyword, 300)
  const [filter, setFilter] = useState({
    page: 1,
    page_size: 30,
    keyword: '',
    section: '',
  })
  const [progress, setProgress] = useState(0)
  const [importing, setImporting] = useState(false)

  const { data, isLoading } = useQuery({
    queryKey: ['articles', filter, debouncedKeyword],
    queryFn: async () => {
      const res = await getArticles({ ...filter, keyword: debouncedKeyword })
      return res.data
    },
    staleTime: 5 * 60 * 1000,
  })

  const { data: categories } = useQuery({
    queryKey: ['category'],
    queryFn: async () => {
      const res = await getCategories()
      return res.data
    },
    staleTime: 5 * 60 * 1000,
  })

  return (
    <div className='flex h-full flex-col overflow-hidden'>
      {/* ① 筛选栏 */}
      <div className='sticky top-0 z-30 mb-2'>
        <FilterBar
          value={filter}
          categories={categories || []}
          onChange={(v) => setFilter(v)}
          onImport={async (file) => {
            setImporting(true)
            setProgress(0)
            try {
              const res = await uploadArticle(file, (p) => {
                setProgress(p)
              })
              if (res.code === 0) {
                toast.success(res.message)
              }
            } finally {
              setImporting(false)
            }
          }}
        />
        {importing && (
          <div className='px-2'>
            <Progress value={progress} />
            <div className='mt-1 text-sm text-muted-foreground'>
              正在导入 {progress}%
            </div>
          </div>
        )}
      </div>

      {/* ② 表格区域（滚动容器） */}
      <div className='flex-1 space-y-2 overflow-auto'>
        {isLoading && <Loading />}
        {data?.items.length === 0 && <EmptyState />}
        {data?.items.map((article) => (
          <ArticleCard key={article.tid} article={article} />
        ))}
      </div>

      {/* ④ 分页 */}
      <div className='sticky bottom-0 z-30 mt-2'>
        <CommonPagination
          page={filter.page}
          total={data?.total || 0}
          pageSize={filter.page_size}
          onChange={(v) => setFilter((prev) => ({ ...prev, page: v }))}
        />
      </div>
    </div>
  )
}
