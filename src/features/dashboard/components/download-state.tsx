import ReactECharts from 'echarts-for-react'
import type { DownloadState, SectionCount } from '@/api/download-log.ts'
import { useTheme } from '@/context/theme-provider.tsx'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card'

const COLORS_LIGHT = [
  '#FF6B9D', // 玫瑰粉
  '#C44569', // 深玫瑰
  '#FFA07A', // 浅橙
  '#FFD93D', // 明黄
  '#6BCB77', // 翠绿
  '#4D96FF', // 天蓝
  '#9D84B7', // 薰衣草紫
  '#FF8C42', // 活力橙
  '#38E4AE', // 青绿
  '#FF6B9D', // 循环使用
]

const COLORS_DARK = [
  '#FF7EB3', // 亮玫瑰粉
  '#FF6B9D', // 玫瑰红
  '#FFB347', // 金橙
  '#FFE66D', // 柠檬黄
  '#7FE5A8', // 薄荷绿
  '#5DADE2', // 天蓝
  '#BB8FCE', // 紫丁香
  '#FFAB73', // 珊瑚橙
  '#4ECDC4', // 青绿松石
  '#F39C12', // 琥珀金
]

const LEVELS = [
  {
    threshold: 0,
    label: '练气',
    color: 'text-slate-500',
    bgColor: 'bg-slate-100 dark:bg-slate-800',
    progressColor: 'bg-slate-500',
    icon: '🌱',
  },
  {
    threshold: 50,
    label: '筑基',
    color: 'text-blue-600 dark:text-blue-400',
    bgColor: 'bg-blue-50 dark:bg-blue-950',
    progressColor: 'bg-blue-500',
    icon: '🌿',
  },
  {
    threshold: 2000,
    label: '结丹',
    color: 'text-green-600 dark:text-green-400',
    bgColor: 'bg-green-50 dark:bg-green-950',
    progressColor: 'bg-green-500',
    icon: '🌳',
  },
  {
    threshold: 20000,
    label: '元婴',
    color: 'text-orange-600 dark:text-orange-400',
    bgColor: 'bg-orange-50 dark:bg-orange-950',
    progressColor: 'bg-orange-500',
    icon: '⭐',
  },
  {
    threshold: 50000,
    label: '化神',
    color: 'text-purple-600 dark:text-purple-400',
    bgColor: 'bg-purple-50 dark:bg-purple-950',
    progressColor: 'bg-purple-500',
    icon: '👑',
  },
]

const getLevel = (count: number) => {
  for (let i = LEVELS.length - 1; i >= 0; i--) {
    if (count >= LEVELS[i].threshold) {
      return LEVELS[i]
    }
  }
  return LEVELS[0]
}

function NightingaleChart({
  data,
  title,
}: {
  data: SectionCount[]
  title?: string
}) {
  const option = {
    tooltip: {
      trigger: 'item',
    },
    series: [
      {
        name: title,
        type: 'pie',
        roseType: 'area',
        radius: ['10%', '85%'],
        data: data.map((d) => ({
          name: d.section,
          value: d.count,
        })),
        label: {
          show: true,
          formatter: '{b}',
        },
      },
    ],
  }

  return (
    <Card className='w-full'>
      {title && (
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
      )}
      <CardContent className='h-[380px]'>
        <ReactECharts style={{ height: '100%' }} option={option} />
      </CardContent>
    </Card>
  )
}

export function DownloadDashboard({ data }: { data: DownloadState }) {
  const isDark = useTheme().theme === 'dark'
  const COLORS = isDark ? COLORS_DARK : COLORS_LIGHT

  const currentLevel = getLevel(data.download_count)
  const currentLevelIndex = LEVELS.findIndex(
    (l) => l.label === currentLevel.label
  )
  const nextLevel = LEVELS[currentLevelIndex + 1]
  const progress = nextLevel
    ? Math.min(
        ((data.download_count - currentLevel.threshold) /
          (nextLevel.threshold - currentLevel.threshold)) *
          100,
        100
      )
    : 100

  const total = data.section_count.reduce((sum, item) => sum + item.count, 0)

  return (
    <div className='grid gap-6 md:grid-cols-2'>
      <Card className='flex flex-col justify-center border-none bg-secondary/20 shadow-none'>
        <CardHeader>
          <CardTitle className='text-sm font-medium text-muted-foreground'>
            吸纳灵力数量
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className='flex items-baseline gap-2'>
            <span className='text-5xl font-extrabold tracking-tight'>
              {data.download_count.toLocaleString()}
            </span>
            <span className='text-sm text-muted-foreground'>灵力</span>
          </div>
          <div className='mt-4 space-y-2'>
            <div
              className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-semibold ${currentLevel.bgColor} ${currentLevel.color}`}
            >
              <span className='text-base'>{currentLevel.icon}</span>
              <span>{currentLevel.label}</span>
            </div>

            {nextLevel && (
              <div className='space-y-1.5'>
                <div className='flex items-center justify-between text-xs text-muted-foreground'>
                  <span>距离 {nextLevel.label}</span>
                  <span className='font-medium'>{Math.round(progress)}%</span>
                </div>
                <div className='h-2 w-full overflow-hidden rounded-full bg-muted'>
                  <div
                    className={`h-full transition-all duration-500 ease-out ${currentLevel.progressColor}`}
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <p className='text-xs text-muted-foreground'>
                  还需{' '}
                  <span className='font-semibold text-foreground'>
                    {(
                      nextLevel.threshold - data.download_count
                    ).toLocaleString()}
                  </span>{' '}
                  次下载
                </p>
              </div>
            )}

            {!nextLevel && (
              <p className='text-xs font-medium text-amber-600 dark:text-amber-400'>
                ✨ 已达到最高等级！
              </p>
            )}
          </div>

          <div className='mt-6 space-y-3'>
            <p className='text-sm font-medium text-muted-foreground'>
              各灵根吸取状态
            </p>
            {data.section_count
              .sort((a, b) => b.count - a.count)
              .map((item, index) => {
                const percentage = ((item.count / total) * 100).toFixed(1)
                return (
                  <div key={item.section} className='flex items-center gap-3'>
                    <div
                      className='h-3 w-3 flex-shrink-0 rounded-sm'
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                    <div className='flex flex-1 items-center justify-between text-sm'>
                      <span className='font-medium'>{item.section}</span>
                      <div className='flex items-baseline gap-2'>
                        <span className='font-semibold'>
                          {item.count.toLocaleString()}
                        </span>
                        <span className='text-xs text-muted-foreground'>
                          {percentage}%
                        </span>
                      </div>
                    </div>
                  </div>
                )
              })}
          </div>
        </CardContent>
      </Card>

      <Card className='flex flex-col border-none shadow-none'>
        <CardHeader className='items-center pb-2'>
          <CardDescription className='text-center'>
            属性越集中，资质越好
          </CardDescription>
        </CardHeader>
        <CardContent className='h-[300px] w-full flex-1 pb-2'>
          <NightingaleChart data={data.section_count} title={'灵根分布'} />
        </CardContent>
        <CardFooter className='flex-col gap-2 text-center text-xs text-muted-foreground italic'></CardFooter>
      </Card>
    </div>
  )
}
