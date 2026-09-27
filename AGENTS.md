# AGENTS.md

## Stack
- Nuxt 4.5 + Vue + Nuxt UI 4 + Tailwind CSS 4 + Nuxt Content 3 (native sqlite) + `motion-v` + `@vueuse/nuxt` + `shaders`. Package manager **pnpm 12.5.1** — do not use npm/yarn.
- Single-page landing: `app/pages/index.vue` driven by `content/index.yml` validated against `content.config.ts`. `HeroShaders.client.vue` is client-only (GPU-heavy).

## Commands
- `pnpm install` — `postinstall` runs `nuxt prepare` (generates `.nuxt/`). Required after clean install before typecheck/lint.
- `pnpm dev` — dev server on **port 3001** (`nuxt.config.ts:4`), not 3000.
- `pnpm build` / `pnpm preview`
- `pnpm lint` → `eslint .` (uses `.nuxt/eslint.config.mjs` + `eslint-plugin-better-tailwindcss`)
- `pnpm typecheck` → `nuxt typecheck` (relies on generated `.nuxt/tsconfig.*.json`, `vue-tsc`)

## Verification (CI)
- CI (`/.github/workflows/ci.yml`): `pnpm install` → `pnpm lint` → `pnpm typecheck` on Node 22 / ubuntu. No test suite exists — don't add test runners without asking.
- Run lint before typecheck; both must pass.

## Project Structure
- `app/` is Nuxt srcDir (Nuxt 4 default, no `srcDir` in config): `app.vue` (layout: `AppHeader`/`UMain`/`AppFooter` + `UApp`), `app.config.ts` (UI theme: primary `sky`, neutral `zinc`, warning `purple`), `components/`, `assets/css/main.css`, `pages/index.vue`.
- `content/index.yml` — sole content source (`content.config.ts:19` `source: 'index.yml'`, `type: 'page'`). Schema changes require updating both files. Note: `cta` is required in schema but absent in YAML and not rendered; `logos` in YAML is unused (`SkillsGrid.vue` is hardcoded).
- `public/img/Alan.jpg` referenced directly in `app/pages/index.vue:143`. `public/icons/*.svg` (26 SVGs) feed hardcoded `SkillsGrid.vue`.
- Generated/ignored: `.nuxt/`, `.output/`, `.data/` (contains `contents.sqlite`), `.nitro/`, `.cache/`, `dist/` — never edit or commit.

## Conventions & Gotchas
- Content requires rebuild/restart to pick up schema changes; uses `experimental.sqliteConnector: 'native'` (`nuxt.config.ts:22`).
- Nitro prerenders only `/` (`nuxt.config.ts:36`). Add routes there if adding pages.
- `app/assets/css/main.css` is Tailwind entry + `better-tailwindcss` entryPoint (`eslint.config.mjs:11`), includes `@source "../../../content/**/*"` and `@theme static` with custom `--color-sky-*` and `animate-shimmer`. Keep `@import "tailwindcss"; @import "@nuxt/ui";` order.
- ESLint stylistic: `commaDangle: never`, `braceStyle: 1tbs` (`nuxt.config.ts:44`). EditorConfig: 2-space indent, LF, trim trailing whitespace.
- `tsconfig.json` is references-only — actual config lives in `.nuxt/tsconfig.*.json`. Don't add paths there.
- `pnpm-workspace.yaml` restricts builds (`allowBuilds`); `public/` assets are static.
- Dark mode forced on index page (`app/pages/index.vue:3` `colorMode: 'dark'`).
- `README.md:38` still claims port 3000 — trust `nuxt.config.ts:4` (3001); `motion-v`/`@vueuse` composables are auto-imported.
