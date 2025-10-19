import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { toast } from 'sonner'
import type { UseMutationConfig } from '@/shared/types/mutationConfig.ts'
import { DiscountsApi } from '@/modules/discounts/api/api.ts'

export const useDeleteDiscount = (config?: UseMutationConfig) => {
  const queryClient = useQueryClient()
  const { mutate, isPending } = useMutation({
    mutationFn: DiscountsApi.delete,
    ...config,
    onError: (e) => {
      if (axios.isAxiosError(e)) {
        toast.error(e.response?.data.message || e.message)
      }
      config?.onError?.(e)
    },
    onSuccess: (data) => {
      toast.success('Скидка успішно видалена')
      config?.onSuccess?.(data)
    },
    onSettled: async (data, error) => {
      await queryClient.invalidateQueries({
        queryKey: [DiscountsApi.baseKey],
      })
      config?.onSettled?.(data, error)
    },
  })
  return { handleDelete: mutate, isPending }
}
