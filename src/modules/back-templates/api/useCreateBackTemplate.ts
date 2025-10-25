import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { toast } from 'sonner'
import type { UseMutationConfig } from '@/shared/types/mutationConfig.ts'
import { BackTemplatesApi } from '@/modules/back-templates/api/api.ts'

export const useCreateBackTemplate = (config?: UseMutationConfig) => {
  const queryClient = useQueryClient()
  const { mutate, isPending } = useMutation({
    mutationFn: BackTemplatesApi.createTemplate,
    ...config,
    onError: (e: any) => {
      if (axios.isAxiosError(e)) {
        toast.error(e.response?.data.message || e.message)
      }
      config?.onError?.(e)
    },
    onSuccess: async (data: any) => {
      toast.success('Шаблон успішно створено')
      config?.onSuccess?.(data)
    },
    onSettled: async (data: any, error: any) => {
      await queryClient.invalidateQueries({
        queryKey: [BackTemplatesApi.baseKey],
      })
      config?.onSettled?.(data, error)
    },
  })

  return { handleCreate: mutate, isPending }
}
