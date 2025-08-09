// @ts-expect-error: virtual:pwa-register is a Vite virtual module
import { registerSW } from 'virtual:pwa-register'

registerSW({
  immediate: true, // регистрируем сразу
  onNeedRefresh() {
    // можно показать тост “Доступна новая версия — обновить?”
    // Для простоты просто перезагрузим вкладку:
    location.reload()
  },
  onOfflineReady() {
    // можно показать тост “Приложение готово работать офлайн”
    // оставим без UI
  }
})
