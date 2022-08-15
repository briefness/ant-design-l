import { createApp } from 'vue'

import pinia from './store'
import './style.css'
import App from './App.vue'

const app = createApp(App)

app.use(pinia).mount('#app')
