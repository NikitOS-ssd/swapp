// @ts-expect-error: virtual:pwa-register is a Vite virtual module
import { registerSW } from 'virtual:pwa-register'

registerSW({
  immediate: true,
  onNeedRefresh() {
    location.reload()
  },
  onOfflineReady() {
  }
})
