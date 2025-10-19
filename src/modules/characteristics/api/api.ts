import { CHARACTERISTICS_URL } from './routes'
import type { Category, Option } from '@/modules/characteristics/types/types.ts'
import type {
  CreateCategoryInput,
  CreateOptionInput,
} from '@/modules/characteristics'
import { apiClient } from '@/shared/api'

export const CharacteristicsApi = {
  baseKey: 'characteristics',

  // --- Categories ---
  getCategories: () =>
    apiClient.get<Array<Category>>({
      url: CHARACTERISTICS_URL.categories,
    }),

  getCategory: (id: string) =>
    apiClient.get<Category>({
      url: CHARACTERISTICS_URL.category(id),
    }),

  createCategory: (data: CreateCategoryInput) => {
    const formData = new FormData()
    formData.append('title', data.title)
    if (data.icon) {
      formData.append('icon', data.icon)
    }

    return apiClient.post<Category>({
      url: CHARACTERISTICS_URL.categories,
      payload: formData,
      contentType: 'multipart/form-data',
    })
  },

  updateCategory: (id: number, data: CreateCategoryInput) =>
    apiClient.put<Category>({
      url: CHARACTERISTICS_URL.category(id),
      payload: data,
      contentType:
        data instanceof FormData ? 'multipart/form-data' : 'application/json',
    }),

  deleteCategory: (id: string) =>
    apiClient.delete({
      url: CHARACTERISTICS_URL.category(id),
    }),

  getOptions: (categoryId: string) =>
    apiClient.get<Array<Option>>({
      url: CHARACTERISTICS_URL.options(categoryId),
    }),

  createOption: (
    categoryId: string,
    data: CreateOptionInput & { small?: File; large?: File },
  ) => {
    console.log(data)
    const formData = new FormData()
    formData.append('title', data.title)
    if (data.metadata?.colorHex)
      formData.append('metadata', JSON.stringify(data.metadata))
    if (data.small) {
      formData.append('small', data.small)
    }
    if (data.large) {
      formData.append('large', data.large)
    }
    return apiClient.post<Option>({
      url: CHARACTERISTICS_URL.options(categoryId),
      payload: data,
      contentType: 'multipart/form-data',
    })
  },

  updateOption: (categoryId: number, optionId: number, data: any) =>
    apiClient.put<Option>({
      url: CHARACTERISTICS_URL.option(categoryId, optionId),
      payload: data,
      contentType:
        data instanceof FormData ? 'multipart/form-data' : 'application/json',
    }),

  deleteOption: (categoryId: number, optionId: number) =>
    apiClient.delete({
      url: CHARACTERISTICS_URL.option(categoryId, optionId),
    }),
}
