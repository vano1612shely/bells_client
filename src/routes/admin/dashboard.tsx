import { createFileRoute, Outlet } from '@tanstack/react-router'
import {
  SidebarProvider,
  SidebarTrigger,
} from '@/shared/components/ui/sidebar.tsx'
import { AppSidebar } from '@/shared/components/appSidebar.tsx'

export const Route = createFileRoute('/admin/dashboard')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <main className="w-full p-2">
          <SidebarTrigger />
          <Outlet />
        </main>
      </SidebarProvider>
    </>
  )
}
