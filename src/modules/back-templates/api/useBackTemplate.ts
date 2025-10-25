import { useQuery } from '@tanstack/react-query'
import type { UseQueryConfig } from '@/shared/types/queryConfig.ts'
import { withQueryConfig } from '@/shared/lib/withQueryConfig.ts'
import { BackTemplatesApi } from '@/modules/back-templates/api/api.ts'

export const useBackTemplate = (id: string, config?: UseQueryConfig) => {
  const { enabled, queryKey } = withQueryConfig(config)
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [BackTemplatesApi.baseKey, id, ...queryKey],
    queryFn: () => BackTemplatesApi.getTemplate(id),
    enabled,
  })

  return { data, isLoading, error, refetch }
}
