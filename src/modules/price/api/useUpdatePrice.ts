import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import axios from 'axios'
import type { UseMutationConfig } from '@/shared/types/mutationConfig.ts'
import { PriceApi } from '@/modules/price/api/api.ts'

export const useUpdatePrice = (config?: UseMutationConfig) => {
  const queryClient = useQueryClient()
  const { mutate, isPending } = useMutation({
    mutationFn: PriceApi.updatePrice,
    ...config,
    onSuccess: (data) => {
      toast.success('Ціну оновлено')
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
        queryKey: [PriceApi.baseKey],
      })
      config?.onSettled?.(data, error)
    },
  })

  return { handleUpdate: mutate, isPending }
}
