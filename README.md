# Alan del Toro — Software Engineer

> Portfolio personal construido con **Nuxt 4 + Vue 3**. Enfocado en SaaS, CRM y microservicios. Rápido, limpio y 100% mantenible.

[![Nuxt](https://img.shields.io/badge/Nuxt-4.5-00DC82?logo=nuxt&logoColor=white)](https://nuxt.com) [![Vue](https://img.shields.io/badge/Vue-3.5-41B883?logo=vue.js&logoColor=white)](https://vuejs.org) [![Nuxt UI](https://img.shields.io/badge/Nuxt%20UI-4.11-00DC82?logo=nuxt&labelColor=020420)](https://ui.nuxt.com) [![Tailwind](https://img.shields.io/badge/Tailwind-4.3-38BDF8?logo=tailwindcss&logoColor=white)](https://tailwindcss.com) [![TypeScript](https://img.shields.io/badge/TypeScript-6.0-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)

**Vivo:** `pnpm dev` en `http://localhost:3001` · **Idiomas:** EN / ES / FR · **Tema:** dark por defecto · **Contacto:** `alan.deltoro.dev@gmail.com`

---

## Qué es

Landing de una sola página para presentar perfil, habilidades, proyectos y métricas. Sin CMS externo: todo el copy vive en `content/index.yml` y se valida con `content.config.ts`. El resto son componentes Vue con animaciones (`motion-v`) y efectos GPU (`shaders`).

Diseñado para que cualquier reclutador o dev entienda en 30 segundos qué hago, con qué stack y cómo contactarme — sin ruido.

## Stack

| Capa | Tech |
|------|------|
| Framework | Nuxt **4.5.2**, Vue **3.5**, Nuxt UI **4.11**, Tailwind **4.3** |
| Contenido | Nuxt Content **3.16** con `sqliteConnector: 'native'` (`nuxt.config.ts:17`) |
| Animación / UI | `motion-v` **2.4**, `@vueuse/nuxt` **14.4**, `shaders` **3.2** |
| Calidad | `eslint` **10.11** + `eslint-plugin-better-tailwindcss`, `vue-tsc` **3.3**, `typescript` **6.0** |
| Package manager | **pnpm 12.5.1** (único soportado) · Node **22** · `pnpm-workspace.yaml` con `allowBuilds` restringido |

## Funcionalidades

- **i18n sin dependencia externa:** `app/composables/useLocale.ts` con `useCookie('locale')` (`en` por defecto). Todo el contenido tiene clave `en/es/fr` en `content/index.yml`; `app/pages/index.vue` resuelve `content[locale]`.
- **Header con navegación por ancla:** `AppHeader.vue` — brand + links `Skills → #skills`, `Projects → #projects`, `Metrics → #metrics`, `Contact → #contact` + selector EN/ES/FR (`UDropdownMenu`). Scroll con `scroll-mt-(--ui-header-height)` en cada sección.
- **Hero + Terminal + Blob:** `UPageHero` a 2 columnas, `HeroBlobImage` (`/public/img/Alan.jpg`), `HeroTerminal` (líneas por idioma), `HeroShaders.client.vue` (solo cliente, GPU).
- **SkillsGrid (`#skills`):** animación rápida `fastEnter 0.3s` / `fastStagger 0.28s` (`SkillsGrid.vue:96`), 4 categorías (Frontend/Backend/Databases/Tools) con SVGs locales en `/public/icons/*.svg` (30 variantes `_dark`/`_light`). Hover con `group-hover:scale-110`.
- **ProjectsSection (`#projects`):** componente aparte `app/components/ProjectsSection.vue` — grid 3 cols, cards con gradiente `from-primary/15`, badge `category`, `Featured` (`i-lucide-star`), stack `UBadge` y links `UButton`. Actualmente en estado *Coming Soon* (2 items placeholder).
- **Metrics (`#metrics`):** 4 `UPageCard` en grid con `scroll-mt` corregido.
- **Footer + ContactForm (`#contact`):** `AppFooter.vue` con `ContactForm.vue` independiente. Formulario (nombre/email/asunto/mensaje) abre `https://mail.google.com/mail/?view=cm&fs=1&to=alan.deltoro.dev@gmail.com` con fallback `mailto:`. Sociales y stack con SVGs locales (`/icons/vue.svg`, `nuxt.svg`, `nodejs.svg`, etc.).

## Estructura

```
app/
  app.vue                # layout UApp + AppHeader / UMain / AppFooter, html lang reactivo
  app.config.ts          # ui.colors: primary sky, neutral zinc, warning purple + botón con glow
  assets/css/main.css    # @import tailwindcss + @nuxt/ui, @source content, @theme --color-sky-*
  components/
    AppHeader.vue        # nav por hash + i18n
    AppFooter.vue        # footer 5 cols + ContactForm
    ContactForm.vue      # form Gmail
    SkillsGrid.vue       # #skills
    ProjectsSection.vue  # #projects
    HeroTerminal.vue / HeroBlobImage.vue / HeroShaders.client.vue / GradientGlow.vue
  pages/index.vue        # única ruta, consume content[locale]
  composables/useLocale.ts
content/
  index.yml              # única fuente, 3 locales (en/es/fr) — seo/title/description/hero/terminal/features/metrics/cta
  content.config.ts      # defineCollection source:'index.yml' type:'page', localeContentSchema (features con stack/links/category/featured)
public/
  img/Alan.jpg
  icons/*.svg            # 30 SVGs locales (usar mayúsculas exactas: GitHub_dark.svg, React_dark.svg...)
```

Generados e ignorados: `.nuxt/`, `.output/`, `.data/` (sqlite), `.nitro/`, `.cache/`, `dist/` — nunca editar.

## Contenido

- Cambiar copy → editar `content/index.yml`. Requiere reinicio (`sqliteConnector: 'native'` no hace HMR de schema).
- Schema → `content.config.ts`. `features.items` acepta `icon/title/description + category/stack/image/links/featured`. `cta` es opcional y hoy no se renderiza.
- Prerender solo `/` (`nuxt.config.ts:33`). Si agregas rutas, añádelas ahí.

## Desarrollo

Requisitos: **Node 22**, **pnpm 12.5.1**.

```bash
pnpm install        # postinstall ejecuta nuxt prepare → genera .nuxt/
pnpm dev            # http://localhost:3001  (no 3000)
pnpm build          # producción
pnpm preview        # preview local del build
pnpm lint           # eslint .  (usa .nuxt/eslint.config.mjs + better-tailwindcss)
pnpm typecheck      # nuxt typecheck (vue-tsc)
```

CI (`.github/workflows/ci.yml`): `pnpm install` → `pnpm lint` → `pnpm typecheck` en `ubuntu-latest / Node 22`. Sin suite de tests.

### Convenciones

- `main.css` es entry de Tailwind **y** de `better-tailwindcss` (`eslint.config.mjs:11`). Mantener orden `@import "tailwindcss"; @import "@nuxt/ui";`.
- `tsconfig.json` solo referencia `.nuxt/tsconfig.*.json` — no agregar paths ahí.
- ESLint stylistic: `commaDangle: never`, `braceStyle: 1tbs` (`nuxt.config.ts:41`). EditorConfig: 2 espacios, LF, trim.
- Index fuerza dark: `definePageMeta({ colorMode: 'dark' })`.

## Deploy

`pnpm build` genera `.output/` (Nitro `node-server`). Compatible con Vercel/Netlify/Node. Las fuentes se descargan en build (`@nuxt/fonts`).

## Contacto

¿Proyecto en mente? Escríbeme — respondo en 24h.

- **Email:** `alan.deltoro.dev@gmail.com` (formulario abre Gmail)
- **Ubicación:** Monterrey, NL — México (remoto global)
- **Stack foco:** Vue.js, Nuxt (Nuxt UI), Node.js, NestJS, PostgreSQL/MongoDB, Prisma, Docker

---

Hecho con Nuxt UI. Renovate activo (`renovate.json` → `nuxt/renovate-config-nuxt`) para deps automáticas.
