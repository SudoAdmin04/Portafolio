export type Locale = 'en' | 'es' | 'fr'

export const locales: { code: Locale, label: string, shortLabel: string }[] = [
  { code: 'en', label: 'English', shortLabel: 'EN' },
  { code: 'es', label: 'Español', shortLabel: 'ES' },
  { code: 'fr', label: 'Français', shortLabel: 'FR' }
]

export function useLocale() {
  const locale = useCookie<Locale>('locale', {
    default: () => 'en',
    watch: true
  })

  if (import.meta.client) {
    if (!['en', 'es', 'fr'].includes(locale.value)) {
      locale.value = 'en'
    }
  }

  function setLocale(value: Locale) {
    locale.value = value
  }

  const currentLocale = computed(() => locales.find(l => l.code === locale.value) ?? locales[0]!)

  return {
    locale,
    locales,
    currentLocale,
    setLocale
  }
}
