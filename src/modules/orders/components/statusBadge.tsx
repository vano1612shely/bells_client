import type { OrderStatus } from '@/modules/orders/types'
import {
  statusColors,
  statusLabels,
  statusLabelsFr,
} from '@/modules/orders/types'

export const StatusBadge = ({
  status,
  lang = 'fr',
}: {
  status: OrderStatus
  lang?: 'ua' | 'fr'
}) => (
  <span
    className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[status]}`}
  >
    {lang === 'ua' ? statusLabels[status] : statusLabelsFr[status]}
  </span>
)
