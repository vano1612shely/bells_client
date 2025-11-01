import { useQuery } from '@tanstack/react-query'
import type { UseQueryConfig } from '@/shared/types/queryConfig.ts'
import { withQueryConfig } from '@/shared/lib/withQueryConfig.ts'
import { MondialRelayApi } from '@/modules/mondial-relay/api/api.ts'

export const usePoints = (q: string, config?: UseQueryConfig) => {
  const { enabled, queryKey } = withQueryConfig(config)
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [MondialRelayApi.baseKey, q, ...queryKey],
    queryFn: () => MondialRelayApi.getPoints(q),
    enabled,
  })

  return { data, isLoading, error, refetch }
}
