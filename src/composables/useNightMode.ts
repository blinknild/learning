import { ref, watch } from 'vue'

const STORAGE_KEY = 'jap-night-mode'

export function readNightModeEnabled(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEY) === '1'
  } catch {
    return false
  }
}

export function applyNightModeClass(enabled: boolean) {
  document.documentElement.classList.toggle('dark', enabled)
}

/** 在 createApp 之前调用，避免首屏背景与开关状态不一致 */
export function initNightModeFromStorage() {
  applyNightModeClass(readNightModeEnabled())
}

export function useNightMode() {
  const nightMode = ref(readNightModeEnabled())

  watch(nightMode, (on) => {
    try {
      localStorage.setItem(STORAGE_KEY, on ? '1' : '0')
    } catch {
      /* ignore */
    }
    applyNightModeClass(on)
  })

  return { nightMode }
}
