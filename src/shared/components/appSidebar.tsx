import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/shared/components/ui/sidebar'
import { Barcode, CirclePercent, Store } from 'lucide-react'
import { Link } from '@tanstack/react-router'

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        <SidebarMenuItem>
          <SidebarMenuButton asChild>
            <Link to="/admin/dashboard">
              <Store />
              <span>Замовлення</span>
            </Link>
          </SidebarMenuButton>
          <SidebarMenuButton asChild>
            <Link to="/admin/dashboard/products">
              <Barcode />
              <span>Характеристики</span>
            </Link>
          </SidebarMenuButton>
          <SidebarMenuButton asChild>
            <Link to="/admin/dashboard/discount">
              <CirclePercent />
              <span>Ціна та скидки</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}
