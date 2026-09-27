<script setup lang="ts">
const { locale } = useLocale()
const toast = useToast()

const i18n = {
  en: {
    title: 'Send me a message',
    subtitle: 'I reply within 24h — via Gmail.',
    name: 'Name',
    namePlaceholder: 'Alan Del Toro',
    email: 'Email',
    emailPlaceholder: 'you@email.com',
    subject: 'Subject',
    subjectPlaceholder: 'Project inquiry',
    message: 'Message',
    messagePlaceholder: 'Tell me about your idea…',
    send: 'Send via Gmail',
    sending: 'Opening Gmail…',
    note: 'Opens Gmail compose in a new tab. No data is stored.',
    required: 'Please fill all required fields.',
    invalidEmail: 'Please enter a valid email.'
  },
  es: {
    title: 'Envíame un mensaje',
    subtitle: 'Respondo en 24h — vía Gmail.',
    name: 'Nombre',
    namePlaceholder: 'Alan Del Toro',
    email: 'Email',
    emailPlaceholder: 'tu@email.com',
    subject: 'Asunto',
    subjectPlaceholder: 'Consulta de proyecto',
    message: 'Mensaje',
    messagePlaceholder: 'Cuéntame tu idea…',
    send: 'Enviar por Gmail',
    sending: 'Abriendo Gmail…',
    note: 'Abre Gmail en una pestaña nueva. No se guardan datos.',
    required: 'Completa todos los campos obligatorios.',
    invalidEmail: 'Ingresa un email válido.'
  },
  fr: {
    title: 'Envoyez-moi un message',
    subtitle: 'Réponse sous 24h — via Gmail.',
    name: 'Nom',
    namePlaceholder: 'Alan Del Toro',
    email: 'Email',
    emailPlaceholder: 'vous@email.com',
    subject: 'Sujet',
    subjectPlaceholder: 'Demande de projet',
    message: 'Message',
    messagePlaceholder: 'Parlez-moi de votre idée…',
    send: 'Envoyer via Gmail',
    sending: 'Ouverture de Gmail…',
    note: 'Ouvre Gmail dans un nouvel onglet. Aucune donnée stockée.',
    required: 'Veuillez remplir tous les champs.',
    invalidEmail: 'Veuillez saisir un email valide.'
  }
} as const

const t = computed(() => i18n[locale.value] ?? i18n.en)

const form = reactive({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const CONTACT_EMAIL = 'alandeltoro138@gmail.com'

function isValidEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
}

function handleSubmit() {
  if (!form.name || !form.email || !form.message) {
    toast.add({ title: t.value.required, color: 'error' })
    return
  }
  if (!isValidEmail(form.email)) {
    toast.add({ title: t.value.invalidEmail, color: 'error' })
    return
  }

  const subject = form.subject || `${t.value.subject}: ${form.name}`
  const body = `Nombre / Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}\n\n— Enviado desde portfolio alandeltoro.dev`

  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(CONTACT_EMAIL)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  const mailtoUrl = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`

  const win = window.open(gmailUrl, '_blank')
  if (!win) {
    window.location.href = mailtoUrl
  }

  toast.add({ title: t.value.sending, description: CONTACT_EMAIL, color: 'success', icon: 'i-lucide-mail' })
}
</script>

<template>
  <UCard class="bg-default/60 backdrop-blur border-default">
    <template #header>
      <div class="space-y-1">
        <h3 class="font-semibold tracking-tight text-highlighted">
          {{ t.title }}
        </h3>
        <p class="text-sm text-muted">
          {{ t.subtitle }}
        </p>
      </div>
    </template>

    <form
      class="space-y-4"
      @submit.prevent="handleSubmit"
    >
      <div class="grid sm:grid-cols-2 gap-4">
        <UFormField
          :label="t.name"
          required
        >
          <UInput
            v-model="form.name"
            :placeholder="t.namePlaceholder"
            icon="i-lucide-user"
            size="lg"
            class="w-full"
          />
        </UFormField>
        <UFormField
          :label="t.email"
          required
        >
          <UInput
            v-model="form.email"
            type="email"
            :placeholder="t.emailPlaceholder"
            icon="i-lucide-mail"
            size="lg"
            class="w-full"
          />
        </UFormField>
      </div>

      <UFormField :label="t.subject">
        <UInput
          v-model="form.subject"
          :placeholder="t.subjectPlaceholder"
          icon="i-lucide-tag"
          size="lg"
          class="w-full"
        />
      </UFormField>

      <UFormField
        :label="t.message"
        required
      >
        <UTextarea
          v-model="form.message"
          :placeholder="t.messagePlaceholder"
          :rows="4"
          autoresize
          class="w-full"
        />
      </UFormField>

      <UButton
        type="submit"
        color="primary"
        size="lg"
        icon="i-lucide-send"
        block
        class="rounded-full font-semibold"
      >
        {{ t.send }}
      </UButton>

      <p class="text-center text-xs text-dimmed">
        {{ t.note }}
      </p>
    </form>
  </UCard>
</template>
