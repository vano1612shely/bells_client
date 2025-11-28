import { useState } from 'react'
import type { ColumnDef } from '@tanstack/table-core'
import type { Order } from '@/modules/orders/types'
import { OrderDetailsModal } from '@/modules/orders'
import { StatusSelect } from '@/modules/orders/components/statusSelect.tsx'
import { OrderApi } from '@/modules/orders/api/api.ts'

const base64ToBlob = (base64: string, mime = 'application/pdf') => {
  const sliceSize = 1024
  const byteChars = atob(base64)
  const byteArrays: Array<Uint8Array> = []

  for (let offset = 0; offset < byteChars.length; offset += sliceSize) {
    const slice = byteChars.slice(offset, offset + sliceSize)
    const byteNumbers = new Array(slice.length)
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i)
    }
    byteArrays.push(new Uint8Array(byteNumbers))
  }
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return new Blob(byteArrays, { type: mime })
}

const DownloadPdfButton = ({ orderId }: { orderId: string }) => {
  const [isLoading, setIsLoading] = useState(false)

  const handleDownload = async () => {
    try {
      setIsLoading(true)
      const { file_content, file_name } = await OrderApi.downloadPdf(orderId)
      const blob = base64ToBlob(file_content, 'application/pdf')
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = file_name || `order-${orderId}.pdf`
      document.body.appendChild(link)
      link.click()
      link.remove()
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Failed to download order PDF', error)
      alert('Не вдалося завантажити PDF. Спробуйте ще раз.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <button
      onClick={handleDownload}
      disabled={isLoading}
      className="px-3 py-1 border rounded-lg bg-gray-50 hover:bg-gray-100 disabled:opacity-50"
    >
      {isLoading ? 'Завантаження...' : 'PDF'}
    </button>
  )
}

export const columns = (): Array<ColumnDef<Order>> => [
  {
    accessorKey: 'id',
    header: 'ID',
  },
  {
    accessorKey: 'name',
    header: "Ім'я",
  },
  { accessorKey: 'email', header: 'Email' },
  {
    accessorKey: 'totalQuantity',
    header: 'Кількість',
    cell: ({ row }) => `${row.original.totalQuantity} шт`,
  },
  {
    accessorKey: 'totalPriceWithDiscount',
    header: 'Сума',
    cell: ({ row }) =>
      new Intl.NumberFormat('uk-UA', {
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
    header: 'Створено',
    cell: ({ row }) =>
      new Date(row.original.createdAt).toLocaleDateString('uk-UA'),
  },
  {
    accessorKey: 'download',
    header: 'Завантажити',
    cell: ({ row }) => <DownloadPdfButton orderId={row.original.id} />,
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
