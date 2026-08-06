import { useState, useEffect } from 'react'
import { resolvePublicPath } from '../lib/publicPath'

export function useData<T>(path: string) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(resolvePublicPath(path))
      .then((r) => r.json())
      .then((d) => {
        setData(d)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [path])

  return { data, loading }
}
