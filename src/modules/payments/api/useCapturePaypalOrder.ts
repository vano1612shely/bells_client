import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { toast } from 'sonner'
import { PaymentsApi } from './api.ts'
import type { UseMutationConfig } from '@/shared/types/mutationConfig.ts'

export const useCapturePaypalOrder = (config?: UseMutationConfig) => {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: PaymentsApi.captureOrder,
    ...config,
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || error.message)
      }
      config?.onError?.(error)
    },
  })

  return {
    capturePaypalOrder: mutateAsync,
    isCapturingPaypalOrder: isPending,
  }
}
