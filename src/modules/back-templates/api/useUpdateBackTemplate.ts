import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { toast } from 'sonner'
import type { UseMutationConfig } from '@/shared/types/mutationConfig'
import { BackTemplatesApi } from '@/modules/back-templates/api/api'
import type { CreateBackTemplateInput } from '@/modules/back-templates'

type UpdateBackTemplatePayload = {
  id: string
  data: CreateBackTemplateInput & { image?: File; thumbnail?: File }
}

export const useUpdateBackTemplate = (config?: UseMutationConfig) => {
  const queryClient = useQueryClient()
  const { mutate, isPending } = useMutation({
    mutationFn: ({ id, data }: UpdateBackTemplatePayload) =>
      BackTemplatesApi.updateTemplate(id, data),
    ...config,
    onSuccess: (data) => {
      toast.success('Задній шаблон оновлено')
      config?.onSuccess?.(data)
    },
    onError: (e: any) => {
      if (axios.isAxiosError(e)) {
        toast.error(e.response?.data.message || e.message)
      }
      config?.onError?.(e)
    },
    onSettled: async (data, error, variables) => {
      await queryClient.invalidateQueries({
        queryKey: [BackTemplatesApi.baseKey],
      })
      await queryClient.invalidateQueries({
        queryKey: [BackTemplatesApi.baseKey, variables?.id],
      })
      config?.onSettled?.(data, error)
    },
  })

  return { handleUpdate: mutate, isPending }
}
