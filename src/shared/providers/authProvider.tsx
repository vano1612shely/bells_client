import { useEffect } from 'react'
import type { FC, ReactNode } from 'react'
import { useAuthStore } from '@/shared/store/auth.store.ts'

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const loadFromLocalStorage = useAuthStore((s) => s.loadFromStore)
  const loaded = useAuthStore((s) => s.is_init)

  useEffect(() => {
    loadFromLocalStorage()
  }, [loadFromLocalStorage])

  if (!loaded) {
    return null
  }
  return <>{children}</>
}
