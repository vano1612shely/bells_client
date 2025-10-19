import { useQuery } from '@tanstack/react-query'
import type { UseQueryConfig } from '@/shared/types/queryConfig.ts'
import { withQueryConfig } from '@/shared/lib/withQueryConfig.ts'
import { OrderApi } from '@/modules/orders/api/api.ts'

export const useOrder = (id: string, config?: UseQueryConfig) => {
  const { enabled, queryKey } = withQueryConfig(config)
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [OrderApi.baseKey, id, ...queryKey],
    queryFn: () => OrderApi.getOrder(id),
    enabled,
  })

  return { data, isLoading, error, refetch }
}
