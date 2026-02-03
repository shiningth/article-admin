import { Pencil, Play, Trash2 } from 'lucide-react'
import type { Task } from '@/api/task.ts'
import { cn } from '@/lib/utils.ts'
import { Badge } from '@/components/ui/badge.tsx'
import { Button } from '@/components/ui/button.tsx'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table.tsx'
import { ConfirmButton } from '@/components/confirm-button.tsx'

export function TaskTableDesktop({
  data,
  onEdit,
  onDelete,
  onRun,
  isLoading,
}: {
  data?: Task[]
  onEdit: (tasK: Task) => void
  onDelete: (id: number) => void
  onRun: (id: number) => void
  isLoading: boolean
}) {
  return (
    <div className='rounded-lg border'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>阵法名称</TableHead>
            <TableHead>阵法核心</TableHead>
            <TableHead>运转周期</TableHead>
            <TableHead>管理</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {isLoading && (
            <TableRow>
              <TableCell colSpan={9} className='text-center'>
                加载中...
              </TableCell>
            </TableRow>
          )}
          {data?.length === 0 && (
            <TableRow>
              <TableCell colSpan={9} className='text-center'>
                暂无数据
              </TableCell>
            </TableRow>
          )}
          {data?.map((task) => (
            <TableRow key={task.id}>
              <TableCell>
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
              </TableCell>

              <TableCell>
                <div className='flex flex-row items-center items-end gap-2'>
                  <Badge variant='outline' className='font-mono'>
                    {task.task_func}
                  </Badge>
                  <div className='flex items-center gap-2'>
                    <span className='hidden text-xs text-muted-foreground md:inline'>
                      →
                    </span>
                    <span className='max-w-[200px] truncate text-xs text-slate-600 md:max-w-none'>
                      {task.task_args}
                    </span>
                  </div>
                </div>
              </TableCell>

              <TableCell>
                <span className='font-mono text-sm text-muted-foreground'>
                  {task.task_cron}
                </span>
              </TableCell>

              <TableCell>
                <ConfirmButton
                  variant='outline'
                  title='确认执行阵法'
                  description='阵法将在后台执行，请勿频繁执行阵法'
                  triggerText={<Play className='h-4 w-4' />}
                  className='mr-2 text-emerald-700'
                  onConfirm={() => onRun(task.id)}
                />
                <Button
                  variant='outline'
                  size='icon'
                  className='mr-2'
                  onClick={() => onEdit(task)}
                >
                  <Pencil className='h-4 w-4' />
                </Button>
                <ConfirmButton
                  variant='outline'
                  className='mr-2 text-destructive'
                  title='删除阵法'
                  description='删除后数据将无法恢复，是否确认？'
                  triggerText={<Trash2 className='h-4 w-4' />}
                  onConfirm={() => onDelete(task.id)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
