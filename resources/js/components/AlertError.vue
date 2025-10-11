<script setup lang="ts">
  import { computed } from 'vue'

  const props = withDefaults(
    defineProps<{
      errors: string[]
      title?: string
    }>(),
    {
      title: 'Something went wrong.',
    },
  )

  const uniqueErrors = computed(() => Array.from(new Set(props.errors)))
</script>

<template>
  <UAlert :title="props.title" color="error" icon="i-lucide-alert-circle">
    <template #description>
      <ul class="list-inside list-disc text-sm">
        <li v-for="(error, index) in uniqueErrors" :key="index">
          {{ error }}
        </li>
      </ul>
    </template>
  </UAlert>
</template>
