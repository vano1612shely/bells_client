import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { toast } from 'sonner'
import type { UseMutationConfig } from '@/shared/types/mutationConfig.ts'
import { OrderApi } from '@/modules/orders/api/api.ts'

export const useCreateOrder = (config?: UseMutationConfig) => {
  const { mutate, isPending } = useMutation({
    mutationFn: OrderApi.createOrder,
    ...config,
    onError: (e) => {
      if (axios.isAxiosError(e)) {
        toast.error(e.response?.data.message || e.message)
      }
    },
  })

  return { handleCreate: mutate, isPending }
}
