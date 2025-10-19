import type { ColumnDef } from '@tanstack/table-core'
import type { Order } from '@/modules/orders/types'
import { OrderDetailsModal } from '@/modules/orders'
import { StatusSelect } from '@/modules/orders/components/statusSelect.tsx'

export const columns = (): Array<ColumnDef<Order>> => [
  {
    accessorKey: 'id',
    header: 'ID',
  },
  {
    accessorKey: 'name',
    header: "Ім'я",
  },
  { accessorKey: 'phone', header: 'Телефон' },
  {
    accessorKey: 'totalQuantity',
    header: 'Кількість',
    cell: ({ row }) => `${row.original.totalQuantity} шт`,
  },
  {
    accessorKey: 'totalPriceWithDiscount',
    header: 'Сума',
    cell: ({ row }) =>
      new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'EUR',
      }).format(Number(row.original.totalPriceWithDiscount)),
  },
  {
    accessorKey: 'status',
    header: 'Статус',
    cell: ({ row }) => (
      <StatusSelect
        currentStatus={row.original.status}
        orderId={row.original.id}
      />
    ),
  },
  {
    accessorKey: 'createdAt',
    header: 'Дата',
    cell: ({ row }) =>
      new Date(row.original.createdAt).toLocaleDateString('uk-UA'),
  },
  {
    accessorKey: 'actions',
    header: 'Дії',
    cell: ({ row }) => {
      return (
        <div className="flex gap-2">
          <OrderDetailsModal order={row.original} />
        </div>
      )
    },
  },
]
