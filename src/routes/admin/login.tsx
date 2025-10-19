import { createFileRoute } from '@tanstack/react-router'
import { LoginPage } from '@/pages/login.tsx'

export const Route = createFileRoute('/admin/login')({
  component: () => {
    return <LoginPage />
  },
})
