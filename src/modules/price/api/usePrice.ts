import { useQuery } from '@tanstack/react-query'
import type { UseQueryConfig } from '@/shared/types/queryConfig.ts'
import { withQueryConfig } from '@/shared/lib/withQueryConfig.ts'
import { PriceApi } from '@/modules/price/api/api.ts'

export const usePrice = (config?: UseQueryConfig) => {
  const { enabled, queryKey } = withQueryConfig(config)
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [PriceApi.baseKey, ...queryKey],
    queryFn: PriceApi.getPrice,
    enabled: enabled,
  })

  return { data, isLoading, error, refetch }
}
