import type { LoginInput } from '@/modules/auth'
import { apiClient } from '@/shared/api'
import { AUTH_URL } from '@/modules/auth/api/routes.ts'

export const AuthApi = {
  baseKey: 'auth',
  login: (data: LoginInput) =>
    apiClient.post({
      url: AUTH_URL.login,
      payload: data,
    }),
}
