import type { OrderSchema } from '@/modules/orders'
import type { Category } from '@/modules/characteristics'

export const orderDefaultValues = (
  phone?: string,
  name?: string,
  categories?: Array<Category>,
): OrderSchema => {
  return {
    name: name || '',
    phone: phone || '',
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
      },
    ],
  }
}
