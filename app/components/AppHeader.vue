<script setup lang="ts">
const { locale, locales, currentLocale, setLocale } = useLocale()

const dropdownItems = computed(() => [
  locales.map(l => ({
    label: `${l.shortLabel} — ${l.label}`,
    icon: locale.value === l.code ? 'i-lucide-check' : undefined,
    onSelect: () => setLocale(l.code)
  }))
])

const navI18n = {
  en: [
    { label: 'Skills', to: '#skills' },
    { label: 'Projects', to: '#projects' },
    { label: 'Metrics', to: '#metrics' },
    { label: 'Contact', to: '#contact' }
  ],
  es: [
    { label: 'Habilidades', to: '#skills' },
    { label: 'Proyectos', to: '#projects' },
    { label: 'Métricas', to: '#metrics' },
    { label: 'Contacto', to: '#contact' }
  ],
  fr: [
    { label: 'Compétences', to: '#skills' },
    { label: 'Projets', to: '#projects' },
    { label: 'Métriques', to: '#metrics' },
    { label: 'Contact', to: '#contact' }
  ]
} as const

const nav = computed(() => navI18n[locale.value] ?? navI18n.en)
</script>

<template>
  <UHeader>
    <template #left>
      <NuxtLink
        to="/"
        class="font-semibold tracking-tight shrink-0"
      >
        Alan del Toro
      </NuxtLink>
      <nav class="hidden lg:flex items-center gap-1 ml-6">
        <UButton
          v-for="item in nav"
          :key="item.to"
          :label="item.label"
          :to="item.to"
          color="neutral"
          variant="ghost"
          size="sm"
          class="font-medium"
        />
      </nav>
    </template>

    <template #right>
      <UDropdownMenu
        :items="dropdownItems"
        :content="{ align: 'end' }"
      >
        <UButton
          color="neutral"
          variant="ghost"
          icon="i-lucide-languages"
          :label="currentLocale.shortLabel"
          trailing-icon="i-lucide-chevron-down"
          aria-label="Change language"
        />
      </UDropdownMenu>
    </template>

    <template #body>
      <div class="flex flex-col gap-4 py-2">
        <nav class="flex flex-col gap-1">
          <UButton
            v-for="item in nav"
            :key="item.to"
            :label="item.label"
            :to="item.to"
            color="neutral"
            variant="ghost"
            block
            class="justify-start"
          />
        </nav>
        <USeparator />
        <UDropdownMenu
          :items="dropdownItems"
          :content="{ align: 'start' }"
        >
          <UButton
            color="neutral"
            variant="soft"
            icon="i-lucide-languages"
            :label="`${currentLocale.label} (${currentLocale.shortLabel})`"
            trailing-icon="i-lucide-chevron-down"
            block
            aria-label="Change language"
          />
        </UDropdownMenu>
      </div>
    </template>
  </UHeader>
</template>
