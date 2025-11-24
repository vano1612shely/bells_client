import type { CreateBackTemplateInput } from '@/modules/back-templates/models/createBackTemplate.schema.ts'
import type { BackTemplate } from '@/modules/back-templates/types'
import { apiClient } from '@/shared/api'
import { BACK_TEMPLATES_URLS } from '@/modules/back-templates/api/routes.ts'

export const BackTemplatesApi = {
  baseKey: 'back-templates',

  getTemplates: () =>
    apiClient.get<Array<BackTemplate>>({
      url: BACK_TEMPLATES_URLS.templates,
    }),

  getTemplate: (id: string) =>
    apiClient.get<BackTemplate>({
      url: BACK_TEMPLATES_URLS.template(id),
    }),

  createTemplate: (
    data: CreateBackTemplateInput & { image?: File; thumbnail?: File },
  ) => {
    const formData = new FormData()
    formData.append('title', data.title)
    if (data.description) formData.append('description', data.description)
    if (data.image) formData.append('image', data.image)
    if (data.thumbnail) formData.append('thumbnail', data.thumbnail)

    return apiClient.post<BackTemplate>({
      url: BACK_TEMPLATES_URLS.templates,
      payload: formData,
      contentType: 'multipart/form-data',
    })
  },

  updateTemplate: (
    id: string,
    data: CreateBackTemplateInput & { image?: File; thumbnail?: File },
  ) => {
    const formData = new FormData()
    if (data.title) formData.append('title', data.title)
    if (data.description) formData.append('description', data.description)
    if (data.image) formData.append('image', data.image)
    if (data.thumbnail) formData.append('thumbnail', data.thumbnail)

    return apiClient.patch<BackTemplate>({
      url: BACK_TEMPLATES_URLS.template(id),
      payload: formData,
      contentType: 'multipart/form-data',
    })
  },

  deleteTemplate: (id: string) =>
    apiClient.delete({
      url: BACK_TEMPLATES_URLS.template(id),
    }),
}
