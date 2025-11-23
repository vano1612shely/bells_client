import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { toast } from 'sonner'
import type { UseMutationConfig } from '@/shared/types/mutationConfig.ts'
import { PaymentsApi } from './api.ts'

export const useCapturePaypalOrder = (
  config?: UseMutationConfig<{ status: string; orderId: string }>,
) => {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: PaymentsApi.captureOrder,
    ...config,
    onError: (error, variables, context) => {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || error.message)
      }
      config?.onError?.(error, variables, context)
    },
  })

  return {
    capturePaypalOrder: mutateAsync,
    isCapturingPaypalOrder: isPending,
  }
}
