<script setup lang="ts">
  import Layout from '@/layouts/Default.vue'
  import { breakpointsTailwind, useBreakpoints, useFetch } from '@vueuse/core'
  import { computed, ref, watch } from 'vue'
  import type { Mail } from '../types'

  defineOptions({ layout: Layout })

  const tabItems = [
    {
      label: 'All',
      value: 'all',
    },
    {
      label: 'Unread',
      value: 'unread',
    },
  ]
  const selectedTab = ref('all')

  const { data: mails } = useFetch('https://dashboard-template.nuxt.dev/api/mails', { initialData: [] }).json<Mail[]>()

  // Filter mails based on the selected tab
  const filteredMails = computed(() => {
    if (selectedTab.value === 'unread') {
      return mails.value?.filter((mail) => !!mail.unread) ?? []
    }

    return mails.value ?? []
  })

  const selectedMail = ref<Mail | null>()

  const isMailPanelOpen = computed({
    get() {
      return !!selectedMail.value
    },
    set(value: boolean) {
      if (!value) {
        selectedMail.value = null
      }
    },
  })

  // Reset selected mail if it's not in the filtered mails
  watch(filteredMails, () => {
    if (!filteredMails.value.find((mail) => mail.id === selectedMail.value?.id)) {
      selectedMail.value = null
    }
  })

  const breakpoints = useBreakpoints(breakpointsTailwind)
  const isMobile = breakpoints.smaller('lg')
</script>

<template>
  <UDashboardPanel id="inbox-1" :default-size="25" :min-size="20" :max-size="30" resizable>
    <UDashboardNavbar title="Inbox">
      <template #leading>
        <UDashboardSidebarCollapse as="button" :disabled="false" />
      </template>
      <template #trailing>
        <UBadge :label="filteredMails.length" variant="subtle" />
      </template>

      <template #right>
        <UTabs v-model="selectedTab" :items="tabItems" :content="false" size="xs" />
      </template>
    </UDashboardNavbar>

    <InboxList v-model="selectedMail" :mails="filteredMails" />
  </UDashboardPanel>

  <InboxMail v-if="selectedMail" :mail="selectedMail" @close="selectedMail = null" />
  <div v-else class="hidden flex-1 items-center justify-center lg:flex">
    <UIcon name="i-lucide-inbox" class="size-32 text-dimmed" />
  </div>

  <USlideover v-if="isMobile" v-model:open="isMailPanelOpen">
    <template #content>
      <InboxMail v-if="selectedMail" :mail="selectedMail" @close="selectedMail = null" />
    </template>
  </USlideover>
</template>
