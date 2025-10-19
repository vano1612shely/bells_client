import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { UseMutationConfig } from '@/shared/types/mutationConfig.ts'
import { OrderApi } from '@/modules/orders/api/api.ts'

export const useUpdateStatus = (config?: UseMutationConfig) => {
  const queryClient = useQueryClient()
  const { mutate, isPending } = useMutation({
    mutationFn: OrderApi.updateOrderStatus,
    ...config,
    onSettled: async (data, error) => {
      await queryClient.invalidateQueries({
        queryKey: [OrderApi.baseKey],
      })
      config?.onSettled?.(data, error)
    },
  })

  return { handleUpdate: mutate, isPending }
}
