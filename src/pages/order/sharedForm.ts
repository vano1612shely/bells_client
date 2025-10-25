import type { OrderSchema } from '@/modules/orders'
import type { Category } from '@/modules/characteristics'

export const orderDefaultValues = (
  email?: string,
  name?: string,
  categories?: Array<Category>,
): OrderSchema => {
  return {
    name: name || '',
    email: email || '',
    items: [
      {
        quantity: 1,
        characteristics:
          categories?.reduce(
            (acc, category) => {
              if (category.options.length > 0) {
                acc[category.title] = category.options[0].title
              }
              return acc
            },
            {} as Record<string, string>,
          ) || {},
        photo: {
          originImage: null!,
          image: null!,
        },
        backPhoto: {
          originImage: null!,
          image: null!,
        },
        backTemplateId: null,
      },
    ],
  }
}
