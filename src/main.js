import { createApp } from 'vue'
import Toast from 'vue-toastification'
import App from './App.vue'

import 'vue-toastification/dist/index.css'
import './assets/main.css'

createApp(App)
.use(Toast)
.mount('#app')
