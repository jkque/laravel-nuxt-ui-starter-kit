<script setup lang="ts">
  import { logout } from '@/routes'
  import { router } from '@inertiajs/vue3'
  import type { DropdownMenuItem } from '@nuxt/ui'
  import { useColorMode } from '@vueuse/core'

  defineProps<{
    collapsed?: boolean
  }>()

  const colorMode = useColorMode()
  const auth = useAuth()
  const { getInitials } = useInitials()

  const user = computed(() => ({
    name: auth.value.user.name,
    avatar: {
      text: getInitials(auth.value.user.name),
    },
  }))

  const items = computed<DropdownMenuItem[][]>(() => [
    [
      {
        type: 'label',
        label: user.value.name,
        avatar: user.value.avatar,
      },
    ],
    [
      {
        label: 'Profile',
        icon: 'i-lucide-user',
      },
      {
        label: 'Billing',
        icon: 'i-lucide-credit-card',
      },
      {
        label: 'Settings',
        icon: 'i-lucide-settings',
        to: '/settings/profile',
      },
    ],
    [
      {
        label: 'Appearance',
        icon: 'i-lucide-sun-moon',
        children: [
          {
            label: 'Light',
            icon: 'i-lucide-sun',
            type: 'checkbox',
            checked: colorMode.value === 'light',
            onSelect(e: Event) {
              e.preventDefault()

              colorMode.value = 'light'
            },
          },
          {
            label: 'Dark',
            icon: 'i-lucide-moon',
            type: 'checkbox',
            checked: colorMode.value === 'dark',
            onUpdateChecked(checked: boolean) {
              if (checked) {
                colorMode.value = 'dark'
              }
            },
            onSelect(e: Event) {
              e.preventDefault()
            },
          },
        ],
      },
    ],
    [
      {
        label: 'Log out',
        icon: 'i-lucide-log-out',
        to: logout(),
        onSelect: () => handleLogout(),
      },
    ],
  ])

  function handleLogout() {
    router.flushAll()
  }
</script>

<template>
  <UDropdownMenu
    :items="items"
    :content="{ align: 'center', collisionPadding: 12 }"
    :ui="{ content: collapsed ? 'w-48' : 'w-(--reka-dropdown-menu-trigger-width)' }"
  >
    <UButton
      v-bind="{
        ...user,
        label: collapsed ? undefined : auth.user.name,
        trailingIcon: collapsed ? undefined : 'i-lucide-chevrons-up-down',
      }"
      color="neutral"
      variant="ghost"
      block
      :square="collapsed"
      class="data-[state=open]:bg-elevated"
      :ui="{
        trailingIcon: 'text-dimmed',
      }"
    />

    <template #chip-leading="{ item }">
      <span
        :style="{
          '--chip-light': `var(--color-${(item as any).chip}-500)`,
          '--chip-dark': `var(--color-${(item as any).chip}-400)`,
        }"
        class="ms-0.5 size-2 rounded-full bg-(--chip-light) dark:bg-(--chip-dark)"
      />
    </template>
  </UDropdownMenu>
</template>
