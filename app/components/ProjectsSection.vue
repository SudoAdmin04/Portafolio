<script setup lang="ts">
interface ProjectLink {
  label: string
  to: string
  icon?: string
  trailingIcon?: string
  color?: string
  variant?: string
  target?: string
}

interface ProjectItem {
  icon: string
  title: string
  description: string
  category?: string
  stack?: string[]
  image?: string
  links?: ProjectLink[]
  featured?: boolean
}

interface Props {
  headline?: string
  title: string
  description: string
  items: ProjectItem[]
}

defineProps<Props>()

function staggerMotion(index: number = 0) {
  return {
    initial: { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    inViewOptions: { once: true, amount: 0.2 },
    transition: { duration: 0.5, delay: index * 0.07 }
  }
}

function scrollMotion(delay: number = 0) {
  return {
    initial: { opacity: 0, y: 12 },
    whileInView: { opacity: 1, y: 0 },
    inViewOptions: { once: true, amount: 1 },
    transition: { duration: 0.6, delay }
  }
}
</script>

<template>
  <UPageSection
    id="projects"
    :ui="{
      root: 'py-8 sm:py-12 scroll-mt-(--ui-header-height)',
      container: 'max-w-6xl',
      headline: 'font-mono font-medium text-xs text-primary uppercase tracking-[0.12em] text-center',
      title: 'max-w-2xl mx-auto text-center',
      description: 'max-w-2xl mx-auto text-center text-dimmed'
    }"
  >
    <template #headline>
      <Motion
        v-if="headline"
        as="span"
        v-bind="scrollMotion()"
        class="inline-block"
      >
        {{ headline }}
      </Motion>
    </template>

    <template #title>
      <Motion
        as="span"
        v-bind="scrollMotion(0.08)"
        class="inline-block"
      >
        {{ title }}
      </Motion>
    </template>

    <template #description>
      <Motion
        as="span"
        v-bind="scrollMotion(0.16)"
        class="inline-block"
      >
        {{ description }}
      </Motion>
    </template>

    <div class="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
      <Motion
        v-for="(project, index) in items"
        :key="project.title"
        v-bind="staggerMotion(index)"
        class="h-full"
      >
        <article
          class="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-default bg-elevated/40 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-[0_12px_40px_-16px_color-mix(in_oklch,var(--ui-primary)_25%,transparent)] hover:bg-elevated"
          :class="project.featured ? 'sm:col-span-2 lg:col-span-1 ring-1 ring-primary/10' : ''"
        >
          <div class="relative h-36 overflow-hidden border-b border-default bg-gradient-to-br from-primary/15 via-primary/5 to-transparent p-5">
            <div class="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:20px_20px] opacity-50" />

            <div class="relative flex items-start justify-between">
              <span
                v-if="project.category"
                class="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-primary"
              >
                {{ project.category }}
              </span>
              <span
                v-else
                class="inline-flex size-2 rounded-full bg-primary/60 animate-pulse"
              />
              <span
                v-if="project.featured"
                class="inline-flex items-center gap-1 rounded-full bg-primary px-2 py-1 text-[10px] font-semibold text-white"
              >
                <UIcon
                  name="i-lucide-star"
                  class="size-3"
                />
                Featured
              </span>
            </div>

            <div class="relative mt-4 flex justify-center">
              <div class="flex size-14 items-center justify-center rounded-2xl bg-default border border-default shadow-sm transition-transform duration-300 group-hover:scale-105 group-hover:rotate-1">
                <UIcon
                  :name="project.icon"
                  class="size-7 text-primary"
                />
              </div>
            </div>

            <div class="pointer-events-none absolute -bottom-6 left-1/2 h-16 w-3/4 -translate-x-1/2 rounded-full bg-primary/20 blur-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </div>

          <div class="flex flex-1 flex-col p-5">
            <h3 class="text-[15px] font-semibold tracking-tight text-highlighted">
              {{ project.title }}
            </h3>
            <p class="mt-2 line-clamp-3 text-sm leading-relaxed text-muted">
              {{ project.description }}
            </p>

            <div
              v-if="project.stack?.length"
              class="mt-4 flex flex-wrap gap-1.5"
            >
              <UBadge
                v-for="tech in project.stack"
                :key="tech"
                color="neutral"
                variant="soft"
                size="xs"
                class="rounded-full font-mono text-[10px] tracking-wide"
              >
                {{ tech }}
              </UBadge>
            </div>

            <div class="flex-1" />

            <div
              v-if="project.links?.length"
              class="mt-5 flex flex-wrap gap-2"
            >
              <UButton
                v-for="link in project.links"
                :key="link.label"
                v-bind="link"
                size="xs"
                :variant="link.variant as any || 'soft'"
                :color="link.color as any || 'primary'"
                :target="link.target || '_blank'"
                class="rounded-full"
              />
            </div>
            <div
              v-else
              class="mt-5 flex gap-2"
            >
              <UButton
                label="View case"
                color="neutral"
                variant="ghost"
                size="xs"
                trailing-icon="i-lucide-arrow-right"
                class="rounded-full opacity-60 group-hover:opacity-100"
                to="#"
              />
            </div>
          </div>
        </article>
      </Motion>
    </div>
  </UPageSection>
</template>
