import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getTasks, pageTaskLog } from '@/api/task.ts'
import { formatDateTime } from '@/lib/utils.ts'
import { Badge } from '@/components/ui/badge.tsx'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select.tsx'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table.tsx'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip.tsx'
import { CommonPagination } from '@/components/pagination.tsx'

const PAGE_SIZE = 20
export interface TaskLogFilter {
  page: number
  pageSize: number
  task_func: string
}
export interface TaskLog {
  id: number
  task_func: string
  start_time: string
  end_time: string
  execute_seconds: number
  execute_result: string
  execute_flag: string
  success: boolean
  error: string
  create_time: string
}
export interface TaskLogResult {
  total: number
  items: TaskLog[]
}

export function TaskLogTable() {
  const [filter, setFilter] = useState({
    task_func: '',
    page: 1,
    pageSize: 20,
  })
  const { data } = useQuery({
    queryKey: ['task-log', filter],
    queryFn: async () => {
      const res = await pageTaskLog(filter)
      return res.data
    },
    staleTime: 5 * 60 * 1000,
  })

  const { data: tasks } = useQuery({
    queryKey: ['tasks'],
    queryFn: async () => {
      const res = await getTasks()
      return res.data
    },
    staleTime: 5 * 60 * 1000,
  })
  return (
    <>
      <Select
        value={filter.task_func}
        onValueChange={(v) => setFilter((prev) => ({ ...prev, task_func: v }))}
      >
        <SelectTrigger className='w-full max-w-48'>
          <SelectValue placeholder='选择一个函数' />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value='all'>全部函数</SelectItem>
            {tasks?.map((item, index) => (
              <SelectItem value={item.task_func} key={index}>
                {item.task_name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <div className='rounded-lg border'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>任务函数</TableHead>
              <TableHead>开始时间</TableHead>
              <TableHead>结束时间</TableHead>
              <TableHead>耗时</TableHead>
              <TableHead className='max-w-[300px]'>输出信息</TableHead>
              <TableHead>执行结果</TableHead>
              <TableHead>异常信息</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.items.map((log) => (
              <TableRow key={log.id}>
                <TableCell>{log.task_func}</TableCell>
                <TableCell>{formatDateTime(log.start_time)}</TableCell>
                <TableCell>{formatDateTime(log.end_time)}</TableCell>
                <TableCell>{log.execute_seconds}秒</TableCell>
                <TableCell className='max-w-[300px] overflow-hidden'>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className='cursor-pointer truncate'>
                        {log.execute_result}
                      </span>
                    </TooltipTrigger>
                    <TooltipContent className='max-h-[400px] max-w-[600px] overflow-auto' side="left">
                      <pre className='text-xs whitespace-pre-wrap'>
                        {JSON.stringify(
                          JSON.parse(log.execute_result),
                          null,
                          2
                        )}
                      </pre>
                    </TooltipContent>
                  </Tooltip>
                </TableCell>
                <TableCell>
                  <Badge>{log.success ? '成功' : '失败'}</Badge>
                </TableCell>
                <TableCell>{log.error}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <CommonPagination
        page={filter.page}
        total={data?.total || 0}
        pageSize={PAGE_SIZE}
        onChange={(v) => setFilter((prev) => ({ ...prev, page: v }))}
      />
    </>
  )
}
