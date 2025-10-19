import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import type { UseMutationConfig } from '@/shared/types/mutationConfig.ts'
import { AuthApi } from '@/modules/auth/api/api.ts'
import { useAuthStore } from '@/shared/store/auth.store.ts'

export const useLogin = (config?: UseMutationConfig) => {
  const login = useAuthStore((state) => state.login)
  const mutation = useMutation({
    mutationFn: AuthApi.login,
    ...config,
    onSuccess: (data) => {
      if (data) {
        localStorage.setItem('token', data.access_token)
        login(data.token)
        config?.onSuccess?.(data)
      }
    },
    onError: (error) => {
      toast(error.response?.data?.message || error.message)
      config?.onError?.(error)
    },
  })
  return { handleLogin: mutation.mutate, isPending: mutation.isPending }
}
