import { useQuery } from '@tanstack/react-query'
import type { UseQueryConfig } from '@/shared/types/queryConfig.ts'
import { withQueryConfig } from '@/shared/lib/withQueryConfig.ts'
import { CharacteristicsApi } from '@/modules/characteristics/api/api.ts'

export const useOptions = (id: string, config?: UseQueryConfig) => {
  const { enabled, queryKey } = withQueryConfig(config)
  const { data, isLoading, refetch, error } = useQuery({
    queryKey: [CharacteristicsApi.baseKey, 'options', id, ...queryKey],
    queryFn: () => CharacteristicsApi.getOptions(id),
    enabled,
  })

  return { data, isLoading, refetch, error }
}
