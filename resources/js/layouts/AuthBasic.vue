<template>
  <div class="flex h-screen items-center justify-center px-4">
    <!-- <UButton
      icon="i-lucide-chevron-left"
      to="/"
      size="xl"
      color="neutral"
      variant="subtle"
      class="absolute left-8 top-8 rounded-full z-10"
    /> -->

    <UPageCard variant="subtle" class="w-full max-w-sm">
      <slot />
    </UPageCard>
  </div>
</template>
