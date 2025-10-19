import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import axios from 'axios'
import type { UseMutationConfig } from '@/shared/types/mutationConfig.ts'
import type { CreateOptionInput } from '@/modules/characteristics'
import { CharacteristicsApi } from '@/modules/characteristics/api/api.ts'

export const useCreateOption = (config?: UseMutationConfig) => {
  const queryClient = useQueryClient()
  const { mutate, isPending } = useMutation({
    mutationFn: async (
      data: CreateOptionInput & {
        small?: File
        large?: File
      },
    ) => {
      await CharacteristicsApi.createOption(data.category_id, data)
    },
    ...config,
    onSuccess: (data) => {
      toast.success('Варіант успішно створено')
      config?.onSuccess?.(data)
    },
    onError: (e) => {
      if (axios.isAxiosError(e)) {
        toast.error(e.response?.data.message || e.message)
      }
      config?.onError?.(e)
    },
    onSettled: async (data, error, variables) => {
      await queryClient.invalidateQueries({
        queryKey: [
          CharacteristicsApi.baseKey,
          'options',
          variables.category_id,
        ],
      })
      config?.onSettled?.(data, error)
    },
  })

  return { handleCreate: mutate, isPending }
}
