import { toast } from 'sonner'
import axios from 'axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { UseMutationConfig } from '@/shared/types/mutationConfig.ts'
import { CharacteristicsApi } from '@/modules/characteristics/api/api.ts'

export const useDeleteCategory = (config?: UseMutationConfig) => {
  const queryClient = useQueryClient()
  const { mutate, isPending } = useMutation({
    mutationFn: CharacteristicsApi.deleteCategory,
    ...config,
    onSuccess: (data) => {
      toast.success('Категорія успішно видалена')
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

  return { handleDelete: mutate, isPending }
}
