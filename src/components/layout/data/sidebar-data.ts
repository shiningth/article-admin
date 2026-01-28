import {
  LayoutDashboard,
  ListTodo,
  HelpCircle,
  Settings,
  Newspaper,
  ClipboardClock,
  AlarmClockCheck,
  BookCheck,
  KeyRound,
} from 'lucide-react'
import { type SidebarData } from '../types'
import { useAuthStore } from '@/stores/auth-store.ts'
const { auth } = useAuthStore.getState()
export const sidebarData: SidebarData = {
  user: {
    name: auth.username,
  },
  navGroups: [
    {
      title: '洞天福地',
      items: [
        {
          title: '观心台',
          url: '/',
          icon: LayoutDashboard,
        },
        {
          title: '时辰阵',
          icon: ListTodo,
          items: [
            {
              url: '/tasks',
              title: '阵法编排',
              icon: BookCheck,
            },
            {
              url: '/tasks/log',
              title: '运转记录',
              icon: AlarmClockCheck,
            },
          ],
        },
        {
          title: '征伐录',
          url: '/download-log',
          icon: ClipboardClock,
        },
        {
          title: '万藏阁',
          url: '/articles',
          icon: Newspaper,
        },
      ],
    },
    {
      title: '宗门事务',
      items: [
        {
          title: '法宝校验',
          url: '/settings',
          icon: Settings,
        },
        {
          title: '宗门令符',
          url: '/tokens',
          icon: KeyRound,
        },
        {
          title: '问道台',
          url: '/help-center',
          icon: HelpCircle,
        },
      ],
    },
  ],
}
