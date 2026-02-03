import { Pencil, Play, Trash2 } from 'lucide-react'
import type { Task } from '@/api/task.ts'
import { cn } from '@/lib/utils.ts'
import { Button } from '@/components/ui/button.tsx'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card.tsx'
import { ConfirmButton } from '@/components/confirm-button.tsx'
import { Loading } from '@/components/loading.tsx'
import { EmptyState } from '@/components/empty.tsx'

export function TaskTableMobile({
  data,
  onEdit,
  onDelete,
  onRun,
  isLoading
}: {
  data?: Task[]
  onEdit: (tasK: Task) => void
  onDelete: (id: number) => void
  onRun: (id: number) => void
  isLoading: boolean
}) {
  return (
    <div className='space-y-2'>
      {isLoading && <Loading />}
      {data?.length === 0 && <EmptyState />}
      {data?.map((task: Task) => (
        <Card className='w-full max-w-sm' key={task.id}>
          <CardHeader>
            <CardTitle>
              <div className='flex items-center gap-3 pl-2'>
                <div
                  className={cn(
                    'h-2 w-2 rounded-full',
                    task.enable
                      ? 'animate-pulse bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]'
                      : 'bg-slate-400 shadow-none'
                  )}
                />
                <span className='text-base font-bold'>{task.task_name}</span>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <dl className='space-y-3'>
              <div className='flex justify-between'>
                <dt className='text-sm text-muted-foreground'>阵法核心</dt>
                <dd className='text-sm'>{task.task_func}</dd>
              </div>
              <div className='flex justify-between'>
                <dt className='text-sm text-muted-foreground'>阵法参数</dt>
                <dd className='text-sm'>{task.task_args}</dd>
              </div>
              <div className='flex justify-between'>
                <dt className='text-sm text-muted-foreground'>运转周期</dt>
                <dd className='text-sm'>{task.task_cron}</dd>
              </div>
            </dl>
          </CardContent>
          <CardFooter className='flex justify-end gap-2'>
            <ConfirmButton
              variant='outline'
              title='确认执行阵法'
              description='阵法将在后台执行，请勿频繁执行阵法'
              triggerText={<Play className='h-4 w-4' />}
              className='text-emerald-700'
              onConfirm={() => onRun(task.id)}
            />
            <Button variant='outline' size='icon' onClick={() => onEdit(task)}>
              <Pencil className='h-4 w-4' />
            </Button>
            <ConfirmButton
              variant='outline'
              className='text-destructive'
              title='删除阵法'
              description='删除后数据将无法恢复，是否确认？'
              triggerText={<Trash2 className='h-4 w-4' />}
              onConfirm={() => onDelete(task.id)}
            />
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
