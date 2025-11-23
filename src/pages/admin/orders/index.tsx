import { useMemo, useState } from 'react'
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useOrders } from '@/modules/orders'
import { columns } from '@/pages/admin/orders/columns.tsx'
import { statusLabels } from '@/modules/orders/types'

export default function AdminOrdersPage() {
  const [page, setPage] = useState(1)
  const [limit] = useState(10)
  const [statusFilter, setStatusFilter] = useState('')
  const [emailFilter, setEmailFilter] = useState('')

  const { data, isLoading, error } = useOrders({
    ...(emailFilter ? { email: emailFilter } : {}),
    ...(statusFilter ? { status: statusFilter } : {}),
    limit,
    page,
  })
  const dataMemo = useMemo(() => data?.data || [], [data])
  const columnsMemo = useMemo(() => columns(), [])
  const table = useReactTable({
    data: dataMemo,
    columns: columnsMemo,
    getCoreRowModel: getCoreRowModel(),
  })

  if (error) {
    return (
      <div className="p-8 text-center">
        <p className="text-red-600">Помилка завантаження: {error.message}</p>
      </div>
    )
  }

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Управління замовленнями</h1>

      <div className="bg-white rounded-lg shadow mb-6">
        <div className="p-4 border-b">
          <div className="flex gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Пошук за email..."
                value={emailFilter}
                onChange={(e) => setEmailFilter(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border rounded-lg"
            >
              <option value="">Всі статуси</option>
              {Object.entries(statusLabels).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          {isLoading ? (
            <div className="p-8 text-center">Завантаження...</div>
          ) : (
            <table className="w-full">
              <thead className="bg-gray-50">
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        className="px-4 py-3 text-left text-sm font-medium text-gray-700"
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody className="divide-y">
                {table.getRowModel().rows.map((row) => (
                  <tr key={row.id} className="hover:bg-gray-50">
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="px-4 py-3 text-sm">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div className="p-4 border-t flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Показано {data?.data.length || 0} з {data?.total || 0} замовлень
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-4 py-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              Попередня
            </button>
            <div className="px-4 py-2 border rounded-lg bg-gray-50">
              Сторінка {page} з {Math.ceil((data?.total || 0) / limit)}
            </div>
            <button
              onClick={() => setPage((p) => p + 1)}
              disabled={page >= Math.ceil((data?.total || 0) / limit)}
              className="px-4 py-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              Наступна
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
