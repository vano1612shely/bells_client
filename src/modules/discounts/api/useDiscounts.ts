import { useQuery } from '@tanstack/react-query'
import type { UseQueryConfig } from '@/shared/types/queryConfig.ts'
import { withQueryConfig } from '@/shared/lib/withQueryConfig.ts'
import { DiscountsApi } from '@/modules/discounts/api/api.ts'

export const useDiscounts = (config?: UseQueryConfig) => {
  const { enabled, queryKey } = withQueryConfig(config)
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [DiscountsApi.baseKey, ...queryKey],
    queryFn: DiscountsApi.list,
    enabled,
  })

  return { data, isLoading, error, refetch }
}
