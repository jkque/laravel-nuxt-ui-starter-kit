import type { AvatarProps } from '@nuxt/ui'

export interface Auth {
  user: User
}

export type AppPageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
  name: string
  quote: { message: string; author: string }
  auth: Auth
  sidebarOpen: boolean
}

export type BreadcrumbItemType = BreadcrumbItem

export type UserStatus = 'subscribed' | 'unsubscribed' | 'bounced'
export type SaleStatus = 'paid' | 'failed' | 'refunded'

export interface User {
  id: string
  name: string
  email: string
  email_verified_at: string | null
  avatar?: AvatarProps
  status: UserStatus
  location: string
  created_at: string
  updated_at: string
}

export interface Mail {
  id: number
  unread?: boolean
  from: User
  subject: string
  body: string
  date: string
}

export interface Member {
  name: string
  username: string
  role: 'member' | 'owner'
  avatar: Avatar
}

export interface Stat {
  title: string
  icon: string
  value: number | string
  variation: number
  formatter?: (value: number) => string
}

export interface Sale {
  id: string
  date: string
  status: SaleStatus
  email: string
  amount: number
}

export interface Notification {
  id: number
  unread?: boolean
  sender: User
  body: string
  date: string
}

export type Period = 'daily' | 'weekly' | 'monthly'

export interface Range {
  start: Date
  end: Date
}
