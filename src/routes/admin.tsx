import { createFileRoute, redirect } from '@tanstack/react-router'
import { useAuthStore } from '@/shared/store/auth.store'

export const Route = createFileRoute('/admin')({
  beforeLoad: ({ location }) => {
    const isAuthenticated = useAuthStore.getState().is_auth
    if (!isAuthenticated && location.pathname === '/admin') {
      throw redirect({ to: '/admin/login' })
    }

    if (isAuthenticated && location.pathname === '/admin') {
      throw redirect({ to: '/admin/dashboard' })
    }
  },
})
