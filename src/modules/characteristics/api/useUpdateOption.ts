import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import axios from 'axios'
import type { UseMutationConfig } from '@/shared/types/mutationConfig.ts'
import type { CreateOptionInput } from '@/modules/characteristics'
import { CharacteristicsApi } from '@/modules/characteristics/api/api.ts'

type UpdateOptionPayload = {
  optionId: string
  data: CreateOptionInput | FormData
}

export const useUpdateOption = (config?: UseMutationConfig) => {
  const queryClient = useQueryClient()
  const { mutate, isPending } = useMutation({
    mutationFn: ({ optionId, data }: UpdateOptionPayload) =>
      CharacteristicsApi.updateOption(optionId, data),
    ...config,
    onSuccess: (data) => {
      toast.success('Опцію оновлено')
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
        queryKey: [CharacteristicsApi.baseKey],
      })
      config?.onSettled?.(data, error)
    },
  })

  return { handleUpdate: mutate, isPending }
}
