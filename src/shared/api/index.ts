import axios from 'axios'
import type { AxiosRequestConfig, AxiosResponse, Method } from 'axios'

export const LocalStorageTokenKey = 'token'

type ApiRequestConfig = {
  url: string
  params?: Record<string, any>
  payload?: any
  contentType?: string
  headers?: Record<string, string>
  skipAuthHeaders?: boolean
}

type ApiMethod = <T = any>(config: ApiRequestConfig) => Promise<T>

const getData = (): { token: string | null } => {
  return {
    token: localStorage.getItem(LocalStorageTokenKey),
  }
}

const rawApiClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_API_URL,
})

rawApiClient.interceptors.request.use(
  (config) => {
    const { token } = getData()
    if (token && !config.headers.skipAuthHeaders) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

rawApiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 403) {
      localStorage.removeItem(LocalStorageTokenKey)
      window.location.href = '/admin/login'
    }
    return Promise.reject(error)
  },
)

function createMethod(method: Method): ApiMethod {
  return async function <T = any>({
    url,
    params,
    payload,
    contentType,
    headers,
    skipAuthHeaders,
  }: ApiRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await rawApiClient.request<T>({
      url,
      method,
      params,
      data: payload,
      headers: {
        'Content-Type': contentType || 'application/json',
        ...(headers || {}),
        ...(skipAuthHeaders ? { skipAuthHeaders: true } : {}),
      },
    })

    return response.data
  }
}

const getBlobFile = async ({
  url,
  params,
}: ApiRequestConfig): Promise<{
  fileBlob: Blob
  isZip: boolean
}> => {
  const options: AxiosRequestConfig = {
    responseType: 'blob',
    params,
  }
  try {
    const res: Blob = await rawApiClient.get(url, options)
    const isZip = !!res.type && res.type === 'application/zip'
    return {
      fileBlob: res,
      isZip,
    }
  } catch (e: any) {
    return Promise.reject(e)
  }
}
export const apiClient = {
  get: createMethod('get'),
  post: createMethod('post'),
  put: createMethod('put'),
  delete: createMethod('delete'),
  patch: createMethod('patch'),
  getBlobFile: getBlobFile,
}
