<script setup lang="ts">
defineProps<{
  src?: string
  alt?: string
}>()
</script>

<template>
  <div class="relative w-full max-w-md mx-auto aspect-square flex items-center justify-center">
    <div
      class="absolute inset-0 bg-sky-500/20 dark:bg-sky-400/15 rounded-full blur-3xl transform scale-90 -z-10"
    />

    <div class="absolute -top-4 -right-4 size-28 text-sky-500/30 dark:text-sky-400/20 z-0">
      <svg
        class="w-full h-full"
        viewBox="0 0 100 100"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
      >
        <line
          x1="0"
          y1="20"
          x2="100"
          y2="20"
          stroke-dasharray="4 4"
        />
        <line
          x1="0"
          y1="40"
          x2="100"
          y2="40"
          stroke-dasharray="4 4"
        />
        <line
          x1="0"
          y1="60"
          x2="100"
          y2="60"
          stroke-dasharray="4 4"
        />
        <line
          x1="0"
          y1="80"
          x2="100"
          y2="80"
          stroke-dasharray="4 4"
        />
      </svg>
    </div>

    <div class="absolute -bottom-6 -left-6 size-32 text-sky-500/30 dark:text-sky-400/20 z-0 rotate-45">
      <svg
        class="w-full h-full"
        viewBox="0 0 100 100"
        fill="none"
        stroke="currentColor"
        stroke-width="2.5"
      >
        <line
          x1="10"
          y1="0"
          x2="10"
          y2="100"
        />
        <line
          x1="30"
          y1="0"
          x2="30"
          y2="100"
        />
        <line
          x1="50"
          y1="0"
          x2="50"
          y2="100"
        />
        <line
          x1="70"
          y1="0"
          x2="70"
          y2="100"
        />
        <line
          x1="90"
          y1="0"
          x2="90"
          y2="100"
        />
      </svg>
    </div>

    <UIcon
      name="i-lucide-sparkles"
      class="absolute -top-2 left-6 size-7 text-sky-400 animate-pulse z-20"
    />
    <UIcon
      name="i-lucide-sparkles"
      class="absolute bottom-12 -right-4 size-8 text-sky-300/80 z-20"
    />
    <UIcon
      name="i-lucide-sparkles"
      class="absolute  top-16 -right-20 size-8 text-sky-300/80 z-20"
    />

    <div
      class="relative w-full h-full overflow-hidden bg-gradient-to-tr from-sky-500 via-sky-400 to-sky-300 p-1.5 shadow-2xl transition-all duration-700 hover:scale-[1.02]"
      style="border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;"
    >
      <div
        class="w-full h-full overflow-hidden bg-neutral-900/40 backdrop-blur-xs relative flex items-center justify-center"
        style="border-radius: 58% 42% 32% 68% / 58% 32% 68% 42%;"
      >
        <img
          :src="src || '/img/Alan.jpg'"
          :alt="alt || 'Alan Jaen'"
          class="w-full h-full object-cover object-[center_100%] transform scale-150 transition-transform duration-500 hover:scale-130"
        >
      </div>
    </div>
  </div>
</template>
