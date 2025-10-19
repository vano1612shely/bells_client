import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { toast } from 'sonner'
import type { UseMutationConfig } from '@/shared/types/mutationConfig.ts'
import { DiscountsApi } from '@/modules/discounts/api/api.ts'

export const useCreateDiscount = (config?: UseMutationConfig) => {
  const queryClient = useQueryClient()
  const { mutate, isPending } = useMutation({
    mutationFn: DiscountsApi.create,
    ...config,
    onSuccess: (data) => {
      toast.success('Скидка успішно створена')
      config?.onSuccess?.(data)
    },
    onError: (e) => {
      if (axios.isAxiosError(e)) {
        toast.error(e.response?.data.message || e.message)
      }
      config?.onError?.(e)
    },
    onSettled: async (data, error) => {
      await queryClient.invalidateQueries({
        queryKey: [DiscountsApi.baseKey],
      })
      config?.onSettled?.(data, error)
    },
  })

  return { handleCreate: mutate, isPending }
}
