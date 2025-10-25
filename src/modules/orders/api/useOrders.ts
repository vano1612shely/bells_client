import { useQuery } from '@tanstack/react-query'
import type { UseQueryConfig } from '@/shared/types/queryConfig.ts'
import { withQueryConfig } from '@/shared/lib/withQueryConfig.ts'
import { OrderApi } from '@/modules/orders/api/api.ts'

export const useOrders = (
  filters: { status?: string; email?: string; page?: number; limit?: number },
  config?: UseQueryConfig,
) => {
  const { enabled, queryKey } = withQueryConfig(config)
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [OrderApi.baseKey, filters, ...queryKey],
    queryFn: () => OrderApi.getOrders(filters),
    enabled,
  })

  return { data, isLoading, error, refetch }
}
