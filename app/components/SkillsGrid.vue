<script setup lang="ts">
interface Skill {
  name: string
  color?: string
  icon: string
}

interface SkillCategory {
  key: string
  title: string
  skills: Skill[]
}

const { locale } = useLocale()

const i18n = {
  en: {
    header: 'Technical Skills',
    subheader: 'Technologies & Tools',
    categories: {
      frontend: 'Frontend',
      backend: 'Backend',
      databases: 'Databases',
      tools: 'Tools & Practices'
    }
  },
  es: {
    header: 'Habilidades Técnicas',
    subheader: 'Tecnologías & Herramientas',
    categories: {
      frontend: 'Frontend',
      backend: 'Backend',
      databases: 'Bases de Datos',
      tools: 'Herramientas & Prácticas'
    }
  },
  fr: {
    header: 'Compétences Techniques',
    subheader: 'Technologies & Outils',
    categories: {
      frontend: 'Frontend',
      backend: 'Backend',
      databases: 'Bases de Données',
      tools: 'Outils & Pratiques'
    }
  }
} as const

const t = computed(() => i18n[locale.value] ?? i18n.en)

const categories = computed<SkillCategory[]>(() => [
  {
    key: 'frontend',
    title: t.value.categories.frontend,
    skills: [
      { name: 'Vue.js', color: '#41B883', icon: '/icons/vue.svg' },
      { name: 'React', color: '#61DAFB', icon: '/icons/react_dark.svg' },
      { name: 'Angular', color: '#DD0031', icon: '/icons/angular.svg' },
      { name: 'Nuxt', color: '#00DC82', icon: '/icons/nuxt.svg' },
      { name: 'Next.js', color: '#FFFFFF', icon: '/icons/nextjs_icon_dark.svg' },
      { name: 'TypeScript', color: '#3178C6', icon: '/icons/typescript.svg' }
    ]
  },
  {
    key: 'backend',
    title: t.value.categories.backend,
    skills: [
      { name: 'Node.js', color: '#339933', icon: '/icons/nodejs.svg' },
      { name: 'NestJS', color: '#E0234E', icon: '/icons/nestjs.svg' },
      { name: 'Express', color: '#FFFFFF', icon: '/icons/Express.js_dark.svg' },
      { name: 'Socket.IO', color: '#FFFFFF', icon: '/icons/socket.IO_dark.svg' },
      { name: 'Prisma ORM', color: '#FFFFFF', icon: '/icons/Prisma_dark.svg' }
    ]
  },
  {
    key: 'databases',
    title: t.value.categories.databases,
    skills: [
      { name: 'PostgreSQL', color: '#4169E1', icon: '/icons/postgresql.svg' },
      { name: 'MongoDB', color: '#47A248', icon: '/icons/Mongodb_dark.svg' },
      { name: 'MySQL', color: '#00758F', icon: '/icons/Mysql_dark.svg' }
    ]
  },
  {
    key: 'tools',
    title: t.value.categories.tools,
    skills: [
      { name: 'Docker', color: '#2496ED', icon: '/icons/docker.svg' },
      { name: 'GitHub', color: '#F05032', icon: '/icons/Github_dark.svg' },
      { name: 'Trello', color: '#38BDF8', icon: '/icons/trello.svg' },
      { name: 'OpenCode', color: '#38BDF8', icon: '/icons/Opencode_dark.svg' }
    ]
  }
])

function fastEnter(delay = 0) {
  return {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.3, delay, ease: 'easeOut' as const }
  }
}

function fastStagger(index = 0) {
  return {
    initial: { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.28, delay: index * 0.06, ease: 'easeOut' as const }
  }
}
</script>

<template>
  <div
    id="skills"
    class="w-full space-y-6 scroll-mt-(--ui-header-height)"
  >
    <Motion
      v-bind="fastEnter(0)"
      class="text-center space-y-2"
    >
      <h3 class="font-mono text-xs uppercase tracking-[0.2em] text-sky-400">
        {{ t.header }}
      </h3>
      <p class="text-2xl font-bold tracking-tight text-white">
        {{ t.subheader }}
      </p>
    </Motion>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Motion
        v-for="(category, idx) in categories"
        :key="category.key"
        v-bind="fastStagger(idx)"
      >
        <div
          class="rounded-xl border border-white/10 bg-white/5 backdrop-blur-md p-5 transition-all duration-300 hover:border-sky-500/30"
        >
          <h4 class="font-mono text-xs uppercase tracking-wider text-neutral-400 mb-4 border-b border-white/10 pb-2">
            {{ category.title }}
          </h4>

          <div class="flex flex-wrap gap-3">
            <div
              v-for="skill in category.skills"
              :key="skill.name"
              class="flex items-center gap-2.5 px-3 py-2 rounded-lg bg-neutral-900/60 border border-white/5 hover:border-sky-400/50 hover:bg-sky-500/10 transition-all duration-200 group cursor-default"
            >
              <img
                :src="skill.icon"
                :alt="`${skill.name} icon`"
                class="size-6 transition-transform group-hover:scale-110 object-contain"
              >
              <span class="text-xs font-medium text-neutral-200 group-hover:text-white">
                {{ skill.name }}
              </span>
            </div>
          </div>
        </div>
      </Motion>
    </div>
  </div>
</template>
