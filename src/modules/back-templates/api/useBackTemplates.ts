import { useQuery } from '@tanstack/react-query'
import type { UseQueryConfig } from '@/shared/types/queryConfig.ts'
import { withQueryConfig } from '@/shared/lib/withQueryConfig.ts'
import { BackTemplatesApi } from '@/modules/back-templates/api/api.ts'

export const useBackTemplates = (config?: UseQueryConfig) => {
  const { enabled, queryKey } = withQueryConfig(config)
  const { data, isLoading, refetch, error } = useQuery({
    queryKey: [BackTemplatesApi.baseKey, ...queryKey],
    queryFn: () => BackTemplatesApi.getTemplates(),
    enabled,
  })

  return { data, isLoading, refetch, error }
}
