import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import axios from 'axios'
import type { UseMutationConfig } from '@/shared/types/mutationConfig.ts'
import { CharacteristicsApi } from '@/modules/characteristics/api/api.ts'
import type { CreateCategoryInput } from '@/modules/characteristics'

type UpdateCategoryPayload = {
  id: string
  data: CreateCategoryInput | FormData
}

export const useUpdateCategory = (config?: UseMutationConfig) => {
  const queryClient = useQueryClient()
  const { mutate, isPending } = useMutation({
    mutationFn: ({ id, data }: UpdateCategoryPayload) =>
      CharacteristicsApi.updateCategory(id, data),
    ...config,
    onSuccess: (data) => {
      toast.success('Категорію оновлено')
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
      await queryClient.invalidateQueries({
        queryKey: [CharacteristicsApi.baseKey],
      })
      config?.onSettled?.(data, error)
    },
  })

  return { handleUpdate: mutate, isPending }
}
