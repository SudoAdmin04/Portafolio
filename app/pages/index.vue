<script setup lang="ts">
definePageMeta({
  colorMode: 'dark'
})

const { data: page } = await useAsyncData('index', () => queryCollection('content').first())
if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

const title = page.value?.seo?.title || page.value?.title
const description = page.value?.seo?.description || page.value?.description

useSeoMeta({
  title,
  ogTitle: title,
  description,
  ogDescription: description
})

const heroTitle = computed(() => {
  const [primary = '', ...secondaryParts] = (page.value?.title ?? '').split('\n')

  return {
    primary,
    secondary: secondaryParts.join(' ').trim()
  }
})

function enterMotion(delay: number = 0) {
  return {
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay }
  }
}

function scrollMotion(delay: number = 0) {
  return {
    initial: { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    inViewOptions: { once: true, amount: 1 },
    transition: { duration: 0.6, delay }
  }
}

function staggerMotion(index: number = 0) {
  return {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    inViewOptions: { once: true, amount: 1 },
    transition: { duration: 0.6, delay: index * 0.08 }
  }
}

const { copy, copied } = useClipboard()
</script>

<template>
  <div v-if="page">
    <!-- Hero -->
    <UPageHero  
      :ui="{
        container: 'relative z-10 lg:py-20 max-w-7xl mx-auto',
        wrapper: 'w-full'
      }"
    >
      <template #top>
        <Motion v-bind="staggerMotion(0)">
          <HeroShaders class="absolute top-0 inset-x-0 opacity-15 h-full" />
        </Motion>

        <GradientGlow class="top-0 w-2/3 h-1/2" />
      </template>

      <!-- Disposición a 2 Columnas -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-end w-full">
        <!-- Columna Izquierda: Texto y Botones -->
        <div class="lg:col-span-7 flex flex-col items-center lg:items-end text-end lg:text-rigth gap-6">
          <Motion v-bind="enterMotion(0.2)">
            <UBadge
              color="neutral"
              variant="soft"
              :label="page.hero.headline"
              class="rounded-full gap-1.5 bg-white/5 backdrop-blur-sm"
            >
              <template #leading>
                <UChip
                  inset
                  standalone
                  :ui="{ base: 'animate-pulse ring-0' }"
                />
              </template>
            </UBadge>
          </Motion>

          <Motion
            as="h1"
            v-bind="enterMotion(0.35)"
            class="text-4xl sm:text-6xl lg:text-6xl xl:text-7xl font-bold tracking-tighter leading-[1.08]"
          >
            {{ heroTitle.primary }}
            <br v-if="heroTitle.secondary">
            <span
              v-if="heroTitle.secondary"
              class="animate-shimmer bg-size-[200%_auto] bg-clip-text text-transparent"
              :style="{
                backgroundImage: 'linear-gradient(135deg, var(--color-primary-400), var(--color-primary-300), var(--color-primary-200), var(--color-primary-100), var(--color-primary-200), var(--color-primary-300), var(--color-primary-400))',
                animationDuration: '10s'
              }"
            >
              {{ heroTitle.secondary }}
            </span>
          </Motion>

          <Motion
            as="p"
            v-bind="enterMotion(0.5)"
            class="max-w-xl text-base sm:text-lg leading-relaxed text-default"
          >
            {{ page.description }}
          </Motion>

          <Motion
            class="flex flex-wrap justify-center lg:justify-start gap-4 pt-2"
            v-bind="enterMotion(0.65)"
          >
            <UButton
              v-for="link in page.hero.links"
              :key="link.label"
              v-bind="link"
            />
          </Motion>
        </div>

        <!-- Columna Derecha: Imagen Orgánica -->
        <div class="lg:col-span-5 w-full flex justify-center">
          <Motion
            v-bind="enterMotion(0.45)"
            class="w-full max-w-md"
          >
            <HeroBlobImage 
              src="/img/Alan.jpg" 
              alt="Alan Jaen" 
            />
          </Motion>
        </div>
      </div>

      <!-- Contenido inferior (Terminal y Logos) -->
      <Motion
        as-child
        v-bind="enterMotion(0.85)"
        class="max-w-2xl mx-auto w-full mt-8"
      >
        <HeroTerminal :lines="page.terminal.lines" />
      </Motion>

      <Motion
        class="w-full max-w-4xl mx-auto mt-16"
        v-bind="scrollMotion(0.95)"
      >
        <SkillsGrid />
      </Motion>
    </UPageHero>

    <!-- Features -->
    <UPageSection
      id="features"
      :ui="{
        root: 'py-16 sm:py-24 scroll-mt-(--ui-header-height)',
        container: 'max-w-5xl',
        headline: 'font-mono font-medium text-xs text-primary uppercase tracking-[0.12em] text-center',
        title: 'max-w-lg mx-auto',
        description: 'max-w-md mx-auto text-dimmed'
      }"
    >
      <template #headline>
        <Motion
          as="span"
          v-bind="scrollMotion()"
          class="inline-block"
        >
          {{ page.features.headline }}
        </Motion>
      </template>

      <template #title>
        <Motion
          as="span"
          v-bind="scrollMotion(0.1)"
          class="inline-block"
        >
          {{ page.features.title }}
        </Motion>
      </template>

      <template #description>
        <Motion
          as="span"
          v-bind="scrollMotion(0.2)"
          class="inline-block"
        >
          {{ page.features.description }}
        </Motion>
      </template>

      <div class="rounded-2xl border border-default bg-default overflow-hidden">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px">
          <Motion
            v-for="(feature, index) in page.features.items"
            :key="feature.title"
            v-bind="staggerMotion(index)"
          >
            <UPageCard
              :icon="feature.icon"
              :title="feature.title"
              :description="feature.description"
              class="rounded-none duration-300"
              to="#"
              :ui="{
                leading: 'mb-5 flex size-9 justify-center rounded-lg bg-primary/10',
                title: 'text-sm tracking-tight',
                description: 'text-sm leading-relaxed sm:line-clamp-2 lg:line-clamp-3 text-dimmed'
              }"
            />
          </Motion>
        </div>
      </div>
    </UPageSection>

    <!-- Metrics -->
    <UPageSection
      id="metrics"
      :ui="{
        root: 'py-24 sm:py-32 scroll-mt-(--ui-header-height)',
        container: 'max-w-5xl',
        headline: 'font-mono font-medium text-xs text-primary uppercase tracking-[0.12em] text-center',
        title: 'max-w-lg mx-auto',
        description: 'max-w-md mx-auto text-dimmed'
      }"
    >
      <template #headline>
        <Motion
          as="span"
          v-bind="scrollMotion()"
          class="inline-block"
        >
          {{ page.metrics.headline }}
        </Motion>
      </template>

      <template #title>
        <Motion
          as="span"
          v-bind="scrollMotion(0.1)"
          class="inline-block"
        >
          {{ page.metrics.title }}
        </Motion>
      </template>

      <template #description>
        <Motion
          as="span"
          v-bind="scrollMotion(0.2)"
          class="inline-block"
        >
          {{ page.metrics.description }}
        </Motion>
      </template>

      <div class="rounded-2xl border border-default bg-default overflow-hidden">
        <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-px">
          <Motion
            v-for="(metric, index) in page.metrics.items"
            :key="metric.label"
            v-bind="staggerMotion(index)"
          >
            <UPageCard
              :title="metric.value"
              :description="metric.label"
              class="rounded-none duration-300"
              to="#"
              :ui="{
                root: 'text-center',
                wrapper: 'items-center',
                title: ['text-4xl font-bold tracking-tight leading-none', metric.class],
                description: 'font-mono text-xs uppercase tracking-[0.06em] text-dimmed mt-3'
              }"
            />
          </Motion>
        </div>
      </div>
    </UPageSection>

  </div>
</template>