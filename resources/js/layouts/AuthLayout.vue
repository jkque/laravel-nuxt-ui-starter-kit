<script setup lang="ts">
  import AuthLayout from '@/layouts/auth/AuthSimpleLayout.vue'

  defineProps<{
    title?: string
    description?: string
    variant?: 'outline' | 'solid' | 'soft' | 'subtle' | 'naked' | 'ghost'
  }>()
</script>

<template>
  <AuthLayout :title :description :variant>
    <slot />
  </AuthLayout>
</template>
