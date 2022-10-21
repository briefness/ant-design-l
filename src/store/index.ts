import type { App } from 'vue'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { createPinia } from 'pinia'

const store = createPinia()

store.use(piniaPluginPersistedstate)

export function setupStore(app: App) {
  app.use(store)
}

export { store };