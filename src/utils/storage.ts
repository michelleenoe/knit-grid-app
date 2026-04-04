const hasWindow = typeof window !== 'undefined'

export function saveToStorage<T>(key: string, value: T) {
  if (!hasWindow) return
  window.localStorage.setItem(key, JSON.stringify(value))
}

export function loadFromStorage<T>(key: string, fallback: T): T {
  if (!hasWindow) return fallback
  try {
    const stored = window.localStorage.getItem(key)
    if (!stored) return fallback
    return JSON.parse(stored) as T
  } catch (error) {
    console.warn(`Unable to read "${key}" from storage`, error)
    return fallback
  }
}
