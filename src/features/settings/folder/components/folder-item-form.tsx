import type { UseFormReturn } from 'react-hook-form'
import { ChevronDown, Trash2, Regex } from 'lucide-react'
import type { Category } from '@/api/article.ts'
import type { Downloader } from '@/api/config.ts'
import { Button } from '@/components/ui/button.tsx'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible.tsx'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form.tsx'
import { Input } from '@/components/ui/input.tsx'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select.tsx'
import type { folderFormValues } from '@/features/settings/folder/schema.ts'


export function FolderItem({
  index,
  form,
  categories,
  downloaders,
  remove,
}: {
  index: number
  form: UseFormReturn<folderFormValues>
  categories?: Category[]
  downloaders?: Downloader[]
  remove: (index: number) => void
}) {
  const category = form.watch(`folders.${index}.category`)
  const subCategory = form.watch(`folders.${index}.subCategory`)
  const regex = form.watch(`folders.${index}.regex`)
  const downloader = form.watch(`folders.${index}.downloader`)
  const savePath = form.watch(`folders.${index}.savePath`)

  const subCategories =
    categories?.find((c) => c.category === category)?.items ?? []

  const savePaths =
    downloaders?.find((d) => d.id === downloader)?.save_paths ?? []

  return (
    <Collapsible className='group overflow-hidden rounded-xl border bg-card'>
      <CollapsibleTrigger asChild>
        <div className='group flex cursor-pointer items-center justify-between gap-3 px-3 py-4 transition-colors hover:bg-muted/50'>
          <div className='flex min-w-0 flex-1 items-center gap-3'>
            <div className='flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-secondary text-[10px] font-bold text-secondary-foreground'>
              {index + 1}
            </div>

            <div className='min-w-0 flex-1 space-y-1'>
              <div className='text-sm leading-none font-medium break-words text-foreground sm:truncate'>
                <span className='text-primary/90'>
                  {category || '未选择板块'}
                </span>
                <span className='mx-1.5 text-muted-foreground/50'>/</span>
                <span>{subCategory || '未选择类目'}</span>
                {regex && (
                  <>
                    <span className='mx-1.5 text-muted-foreground/50'>/</span>
                    <span className='rounded bg-muted px-1 font-mono text-xs'>
                      {regex}
                    </span>
                  </>
                )}
              </div>

              {savePath && (
                <div className='flex items-center gap-1.5 text-xs text-muted-foreground'>
                  <span className='shrink-0 text-[10px] font-semibold tracking-wider uppercase'>
                    {downloader}
                  </span>
                  <span className='text-muted-foreground/30'>|</span>
                  <span className='truncate italic'>{savePath}</span>
                </div>
              )}
            </div>
          </div>

          <div className='ml-2 flex shrink-0 items-center gap-1'>
            <ChevronDown className='h-4 w-4 text-muted-foreground transition-transform duration-200 group-data-[state=open]:rotate-180' />
            <Button
              size='icon'
              variant='ghost'
              className='h-8 w-8 text-destructive hover:bg-destructive/10 hover:text-destructive'
              onClick={(e) => {
                e.stopPropagation()
                remove(index)
              }}
            >
              <Trash2 className='h-4 w-4' />
            </Button>
          </div>
        </div>
      </CollapsibleTrigger>

      <CollapsibleContent className='border-t bg-muted/20'>
        <div className='grid gap-5 p-5 sm:grid-cols-2'>
          <FormField
            control={form.control}
            name={`folders.${index}.category`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>规则板块</FormLabel>
                <Select
                  value={field.value}
                  onValueChange={(v) => {
                    field.onChange(v)
                    form.setValue(`folders.${index}.subCategory`, '')
                  }}
                >
                  <FormControl>
                    <SelectTrigger className='w-full'>
                      <SelectValue placeholder='选择板块' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className='w-full'>
                    <SelectItem value='ALL'>不限制板块</SelectItem>
                    {categories?.map((c) => (
                      <SelectItem key={c.category} value={c.category}>
                        {c.category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={`folders.${index}.subCategory`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>具体分类</FormLabel>
                <Select
                  value={field.value}
                  disabled={!category}
                  onValueChange={field.onChange}
                >
                  <FormControl>
                    <SelectTrigger className='w-full'>
                      <SelectValue placeholder='选择分类' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className='w-full'>
                    <SelectItem value='ALL'>不限制类目</SelectItem>
                    {subCategories.map((s) => (
                      <SelectItem key={s.category} value={s.category}>
                        {s.category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={`folders.${index}.regex`}
            render={({ field }) => (
              <FormItem className='col-span-full'>
                <FormLabel className='flex items-center gap-2'>
                  <Regex className='h-4 w-4' />
                  匹配正则（可选）
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder='^[A-Z]{3,5}-\\d{3,4}$'
                    className='font-mono'
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={`folders.${index}.downloader`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>下载器</FormLabel>
                <Select
                  value={field.value}
                  onValueChange={(v) => {
                    field.onChange(v)
                    form.setValue(`folders.${index}.savePath`, '')
                  }}
                >
                  <FormControl>
                    <SelectTrigger className='w-full'>
                      <SelectValue placeholder='选择下载器' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className='w-full'>
                    {downloaders?.map((d) => (
                      <SelectItem key={d.id} value={d.id}>
                        {d.id}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={`folders.${index}.savePath`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>存储路径</FormLabel>
                <Select
                  value={field.value}
                  disabled={!downloader}
                  onValueChange={field.onChange}
                >
                  <FormControl>
                    <SelectTrigger className='w-full'>
                      <SelectValue placeholder='选择路径' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className='w-full'>
                    {savePaths.map((p) => (
                      <SelectItem key={p.path} value={p.path}>
                        {p.path}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}
