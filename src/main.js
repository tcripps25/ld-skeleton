import '@/assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config'
import ConfirmationService from 'primevue/confirmationservice'
import ToastService from 'primevue/toastservice'
import { definePreset } from '@primevue/themes'
import Aura from '@primevue/themes/aura'
import AuraPreset from './presets/aura'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(ConfirmationService)
app.use(ToastService)

app.use(PrimeVue, {
  unstyled: true,
  pt: AuraPreset
})

app.mount('#app')
