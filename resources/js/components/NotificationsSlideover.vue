<script setup lang="ts">
  import { formatTimeAgo, useFetch } from '@vueuse/core'
  import { useDashboard } from '../composables/useDashboard'
  import type { Notification } from '../types'

  const { isNotificationsSlideoverOpen } = useDashboard()

  const { data: notifications } = useFetch('https://dashboard-template.nuxt.dev/api/notifications', { initialData: [] }).json<Notification[]>()
</script>

<template>
  <USlideover v-model:open="isNotificationsSlideoverOpen" title="Notifications">
    <template #body>
      <RouterLink
        v-for="notification in notifications"
        :key="notification.id"
        :to="`/inbox?id=${notification.id}`"
        class="relative -mx-3 flex items-center gap-3 rounded-md px-3 py-2.5 first:-mt-3 last:-mb-3 hover:bg-elevated/50"
      >
        <UChip color="error" :show="!!notification.unread" inset>
          <UAvatar v-bind="notification.sender.avatar" :alt="notification.sender.name" size="md" />
        </UChip>

        <div class="flex-1 text-sm">
          <p class="flex items-center justify-between">
            <span class="font-medium text-highlighted">{{ notification.sender.name }}</span>

            <time :datetime="notification.date" class="text-xs text-muted" v-text="formatTimeAgo(new Date(notification.date))" />
          </p>

          <p class="text-dimmed">
            {{ notification.body }}
          </p>
        </div>
      </RouterLink>
    </template>
  </USlideover>
</template>
