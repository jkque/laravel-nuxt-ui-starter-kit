import { router } from '@inertiajs/vue3'
import { createSharedComposable } from '@vueuse/core'
import { ref } from 'vue'

const _useDashboard = () => {
  const isNotificationsSlideoverOpen = ref(false)

  defineShortcuts({
    'g-h': () => router.visit('/'),
    'g-i': () => router.visit('/inbox'),
    'g-c': () => router.visit('/customers'),
    'g-s': () => router.visit('/settings'),
    n: () => (isNotificationsSlideoverOpen.value = !isNotificationsSlideoverOpen.value),
  })

  router.on('navigate', () => {
    isNotificationsSlideoverOpen.value = false
  })

  return {
    isNotificationsSlideoverOpen,
  }
}

export const useDashboard = createSharedComposable(_useDashboard)
