import { useState } from 'react'
import { RefreshCw } from 'lucide-react'
import { OrderStatus } from '@/modules/orders/types'
import { StatusBadge, useUpdateStatus } from '@/modules/orders'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu'
import { Button } from '@/shared/components/ui/button'

export const StatusSelect = ({
  currentStatus,
  orderId,
}: {
  currentStatus: OrderStatus
  orderId: string
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const { handleUpdate } = useUpdateStatus()

  // Отримуємо всі значення з enum
  const statusValues = Object.values(OrderStatus) as Array<OrderStatus>

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <StatusBadge status={currentStatus} lang={'ua'} />
          <RefreshCw className="w-3 h-3" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-48">
        {statusValues.map((status) => (
          <DropdownMenuItem
            key={status}
            onClick={() => {
              handleUpdate({ id: orderId, status })
              setIsOpen(false)
            }}
          >
            <StatusBadge status={status} />
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
