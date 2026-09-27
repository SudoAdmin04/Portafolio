<script setup lang="ts">
const { locale } = useLocale()

const i18n = {
  en: {
    brand: 'Alan del Toro',
    role: 'Software Engineer — Vue / Nuxt / Node',
    blurb: 'I build SaaS, CRM and microservices that scale. Available for freelance and full-time. Let\'s ship your next product.',
    quickLinks: 'Quick links',
    links: [
      { label: 'Skills', to: '#skills' },
      { label: 'Projects', to: '#projects' },
      { label: 'Metrics', to: '#metrics' }
    ],
    contactTitle: 'Get in touch',
    email: 'alandeltoro138@gmail.com',
    location: 'Monterrey, NL — Mexico (Remote worldwide)',
    availability: 'Available for new projects',
    copy: 'Built with Nuxt UI • ©',
    stackTitle: 'Stack'
  },
  es: {
    brand: 'Alan del Toro',
    role: 'Ingeniero de Software — Vue / Nuxt / Node',
    blurb: 'Construyo SaaS, CRM y microservicios escalables. Disponible para freelance y tiempo completo. Hagamos tu próximo producto.',
    quickLinks: 'Enlaces',
    links: [
      { label: 'Habilidades', to: '#skills' },
      { label: 'Proyectos', to: '#projects' },
      { label: 'Métricas', to: '#metrics' }
    ],
    contactTitle: 'Contacto',
    email: 'alandeltoro138@gmail.com',
    location: 'Monterrey, NL — México (Remoto)',
    availability: 'Disponible para nuevos proyectos',
    copy: 'Hecho con Nuxt UI • ©',
    stackTitle: 'Stack'
  },
  fr: {
    brand: 'Alan del Toro',
    role: 'Ingénieur Logiciel — Vue / Nuxt / Node',
    blurb: 'Je construis SaaS, CRM et microservices évolutifs. Disponible en freelance et temps plein. Lançons votre prochain produit.',
    quickLinks: 'Liens',
    links: [
      { label: 'Compétences', to: '#skills' },
      { label: 'Projets', to: '#projects' },
      { label: 'Métriques', to: '#metrics' }
    ],
    contactTitle: 'Contact',
    email: 'alandeltoro138@gmail.com',
    location: 'Monterrey, NL — Mexique (Remote)',
    availability: 'Disponible pour nouveaux projets',
    copy: 'Construit avec Nuxt UI • ©',
    stackTitle: 'Stack'
  }
} as const

const t = computed(() => i18n[locale.value] ?? i18n.en)

const socials = [
  { label: 'GitHub', icon: '/icons/GitHub_dark.svg', to: 'https://github.com/SudoAdmin04', alt: 'GitHub' },
  { label: 'Linkedin', icon: '/icons/linkedin.svg', to: 'https://www.linkedin.com/in/alan-jaen-manuel-del-toro/', alt: 'Linkedin' },
]

const stackIcons = [
  { name: 'Vue', icon: '/icons/vue.svg' },
  { name: 'Nuxt', icon: '/icons/nuxt.svg' },
]
</script>

<template>
  <footer
    id="contact"
    class="relative border-t border-default bg-elevated/20 scroll-mt-(--ui-header-height)"
  >
    <div class="pointer-events-none absolute inset-x-0 top-0 h-px " />

    <UContainer class="max-w-6xl py-10 lg:py-14">
      <div class="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-12">
        <div class="lg:col-span-3 space-y-8">
          <div class="space-y-3">
            <h3 class="text-lg font-semibold tracking-tight text-highlighted">
              {{ t.brand }}
            </h3>
            <p class="font-mono text-xs tracking-wider text-primary">
              {{ t.role }}
            </p>
            <p class="max-w-xl text-sm leading-relaxed text-muted">
              {{ t.blurb }}
            </p>
          </div>

          <div class="grid sm:grid-cols-2 gap-8">
            <div class="space-y-3">
              <h4 class="font-mono text-xs uppercase tracking-wider text-dimmed">
                {{ t.quickLinks }}
              </h4>
              <nav class="flex flex-col gap-1">
                <UButton
                  v-for="link in t.links"
                  :key="link.to"
                  :label="link.label"
                  :to="link.to"
                  variant="ghost"
                  color="neutral"
                  size="sm"
                  class="justify-start w-fit px-0 hover:text-primary"
                  trailing-icon="i-lucide-arrow-up-right"
                />
              </nav>
            </div>

            <div class="space-y-3">
              <h4 class="font-mono text-xs uppercase tracking-wider text-dimmed">
                {{ t.contactTitle }}
              </h4>
              <div class="space-y-2 text-sm">
                <a
                  :href="`mailto:${t.email}`"
                  class="inline-flex items-center gap-2 text-primary hover:underline"
                >
                  <UIcon
                    name="i-lucide-mail"
                    class="size-4"
                  />
                  alandeltoro138@gmail.com
                </a>
                <p class="flex items-center gap-2 text-muted">
                  <UIcon
                    name="i-lucide-map-pin"
                    class="size-4 text-dimmed"
                  />
                  {{ t.location }}
                </p>
                <p class="inline-flex items-center gap-2 rounded-full border border-success/20 bg-success/10 px-3 py-1 text-xs font-medium text-success">
                  <span class="size-2 rounded-full bg-success animate-pulse" />
                  {{ t.availability }}
                </p>
              </div>
            </div>
          </div>

          <div class="space-y-3">
            <h4 class="font-mono text-xs uppercase tracking-wider text-dimmed">
              {{ t.stackTitle }}
            </h4>
            <div class="flex flex-wrap gap-2.5">
              <a
                v-for="s in socials"
                :key="s.label"
                :href="s.to"
                :aria-label="s.label"
                target="_blank"
                class="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 backdrop-blur transition-colors hover:border-primary/30 hover:bg-primary/10"
              >
                <img
                  :src="s.icon"
                  :alt="s.alt"
                  class="size-5 object-contain"
                  loading="lazy"
                >
                <span class="text-xs font-medium text-neutral-200">{{ s.label }}</span>
              </a>
            </div>
          </div>
        </div>

        <div class="lg:col-span-2">
          <ContactForm />
        </div>
      </div>

      <div class="mt-10 flex flex-col gap-4 border-t border-default pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p class="text-xs text-dimmed">
          {{ t.copy }} {{ new Date().getFullYear() }} Alan del Toro. All rights reserved.
        </p>
        <div class="flex items-center gap-2">
          <span class="hidden sm:inline font-mono text-[11px] tracking-wider text-dimmed">Built with</span>
          <div class="flex items-center gap-1.5">
            <img
              v-for="s in stackIcons"
              :key="s.name"
              :src="s.icon"
              :alt="s.name"
              :title="s.name"
              class="size-6 rounded-md border border-white/10 bg-white/5 p-1 object-contain"
              loading="lazy"
            >
          </div>
        </div>
      </div>
    </UContainer>
  </footer>
</template>
