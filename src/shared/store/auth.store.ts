import { create } from 'zustand'

export type AuthState = {
  is_auth: boolean
  is_init: boolean
  token: string
}

export type AuthAction = {
  login: (token: string) => void
  loadFromStore: () => Promise<void>
  clear: () => void
}
const initialState: AuthState = {
  is_auth: false,
  is_init: false,
  token: '',
}
export const useAuthStore = create<AuthState & AuthAction>((set) => ({
  ...initialState,
  loadFromStore: async () => {
    const token = localStorage.getItem('token')
    if (token) {
      set({
        is_auth: true,
        is_init: true,
        token: token,
      })
    } else {
      set({ is_init: true })
    }
  },
  login: (token: string) => {
    try {
      set({
        is_auth: true,
        token: token,
      })
    } catch (e) {
      console.log(e)
    }
  },
  clear: () => {
    set({
      is_auth: false,
      token: '',
    })
  },
}))
