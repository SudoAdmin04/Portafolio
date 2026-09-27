<script setup lang="ts">
interface Skill {
  name: string
  color?: string
  icon: string
}

interface SkillCategory {
  title: string
  skills: Skill[]
}

const categories: SkillCategory[] = [
  {
    title: 'Frontend',
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
    title: 'Backend',
    skills: [
      { name: 'Node.js', color: '#339933', icon: '/icons/nodejs.svg' },
      { name: 'NestJS', color: '#E0234E', icon: '/icons/nestjs.svg' },
      { name: 'Express', color: '#FFFFFF', icon: '/icons/express.js_dark.svg' },
      { name: 'Socket.IO', color: '#FFFFFF', icon: '/icons/socket.IO_dark.svg' },
      { name: 'Prisma ORM', color: '#FFFFFF', icon: '/icons/prisma_dark.svg' },

    ]
  },
  {
    title: 'Bases de Datos',
    skills: [
      { name: 'PostgreSQL', color: '#4169E1', icon: '/icons/postgresql.svg' },
      { name: 'MongoDB', color: '#47A248', icon: '/icons/mongodb_dark.svg' },
      { name: 'MySQL', color: '#00758F', icon: '/icons/mysql_dark.svg' }
    ]
  },
  {
    title: 'Herramientas & Prácticas',
    skills: [
      { name: 'Docker', color: '#2496ED', icon: '/icons/docker.svg' },
      { name: 'GitHub', color: '#F05032', icon: '/icons/github_dark.svg' },
      { name: 'Trello', color: '#38BDF8', icon: '/icons/trello.svg' },
      { name: 'OpenCode', color: '#38BDF8', icon: '/icons/opencode_dark.svg' },
    ]
  }
]
</script>

<template>
  <div class="w-full space-y-8">
    <div class="text-center space-y-2">
      <h3 class="font-mono text-xs uppercase tracking-[0.2em] text-sky-400">
        Habilidades Técnicas
      </h3>
      <p class="text-2xl font-bold tracking-tight text-white">
        Tecnologías & Herramientas
      </p>
    </div>

    <!-- Grid de Categorías -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div 
        v-for="category in categories" 
        :key="category.title"
        class="rounded-xl border border-white/10 bg-white/5 backdrop-blur-md p-5 transition-all duration-300 hover:border-sky-500/30"
      >
        <h4 class="font-mono text-xs uppercase tracking-wider text-neutral-400 mb-4 border-b border-white/10 pb-2">
          {{ category.title }}
        </h4>

        <!-- Skills de la categoría -->
        <div class="flex flex-wrap gap-3">
          <div 
            v-for="skill in category.skills" 
            :key="skill.name"
            class="flex items-center gap-2.5 px-3 py-2 rounded-lg bg-neutral-900/60 border border-white/5 hover:border-sky-400/50 hover:bg-sky-500/10 transition-all duration-200 group cursor-default"
          >
            <!-- Icono SVG Local -->
            <img 
              :src="skill.icon" 
              :alt="`${skill.name} icon`" 
              class="size-6 transition-transform group-hover:scale-110 object-contain"
            />
            <span class="text-xs font-medium text-neutral-200 group-hover:text-white">
              {{ skill.name }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>