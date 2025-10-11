<script setup lang="ts">
  import { LinkComponentBaseProps, Method } from '@inertiajs/core'
  import { Link } from '@inertiajs/vue3'

  defineProps<{
    href: LinkComponentBaseProps['href']
    tabindex?: number
    method?: Method
    as?: string
  }>()
</script>

<template>
  <Link
    :href="href"
    :tabindex="tabindex"
    :method="method"
    :as="as"
    class="underline decoration-neutral-300 underline-offset-4 transition-colors duration-300 ease-out hover:text-default hover:decoration-current! focus-visible:outline-primary"
  >
    <slot />
  </Link>
</template>
