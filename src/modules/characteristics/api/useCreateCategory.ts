import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { toast } from 'sonner'
import type { UseMutationConfig } from '@/shared/types/mutationConfig.ts'
import { CharacteristicsApi } from '@/modules/characteristics/api/api.ts'

export const useCreateCategory = (config?: UseMutationConfig) => {
  const queryClient = useQueryClient()
  const { mutate, isPending } = useMutation({
    mutationFn: CharacteristicsApi.createCategory,
    ...config,
    onError: (e) => {
      if (axios.isAxiosError(e)) {
        toast.error(e.response?.data.message || e.message)
      }
      config?.onError?.(e)
    },
    onSuccess: async (data) => {
      toast.success('Категорія успішно створена')
      config?.onSuccess?.(data)
    },
    onSettled: async (data, error) => {
      await queryClient.invalidateQueries({
        queryKey: [CharacteristicsApi.baseKey],
      })
      config?.onSettled?.(data, error)
    },
  })

  return { handleCreate: mutate, isPending }
}
