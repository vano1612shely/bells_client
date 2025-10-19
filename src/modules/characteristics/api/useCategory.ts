import { useQuery } from '@tanstack/react-query'
import type { UseQueryConfig } from '@/shared/types/queryConfig.ts'
import { withQueryConfig } from '@/shared/lib/withQueryConfig.ts'
import { CharacteristicsApi } from '@/modules/characteristics/api/api.ts'

export const useCategory = (id: string, config: UseQueryConfig) => {
  const { enabled, queryKey } = withQueryConfig(config)
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [CharacteristicsApi.baseKey, id, ...queryKey],
    queryFn: () => CharacteristicsApi.getCategory(id),
    enabled: enabled,
  })

  return { data, isLoading, error, refetch }
}
