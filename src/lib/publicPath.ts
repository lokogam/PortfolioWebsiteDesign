export function resolvePublicPath(path: string) {
  if (/^(?:https?:|data:|blob:)/i.test(path)) {
    return path
  }

  const normalized = path.replace(/^\/+/, '')
  const base = import.meta.env.BASE_URL || '/'
  return new URL(normalized, base).toString()
}
