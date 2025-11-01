import type { Category } from '@/modules/characteristics'
import type { OrderSchema } from '@/modules/orders'

export const emptyOrderDefaultValues: OrderSchema = {
  name: '',
  email: '',
  items: [
    {
      quantity: 1,
      characteristics: {},
      photo: {
        originImage: null as unknown as File,
        image: null,
      },
      backPhoto: {
        originImage: null,
        image: null,
      },
      backTemplateId: null,
    },
  ],
  delivery: {
    type: 'home',
    address: {
      name: '',
      street: '',
      additional: '',
      postalCode: '',
      city: '',
      phone: '',
    },
    relay: {
      phone: '',
      point: null,
    },
  },
}
export const orderDefaultValues = (
  email?: string,
  name?: string,
  categories?: Array<Category>,
): OrderSchema => ({
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
        ) ?? {},
      photo: {
        originImage: null as unknown as File,
        image: null,
      },
      backPhoto: {
        originImage: null,
        image: null,
      },
      backTemplateId: null,
    },
  ],
  delivery: {
    type: 'home',
    address: {
      name: '',
      street: '',
      additional: '',
      postalCode: '',
      city: '',
      phone: '',
    },
    relay: {
      phone: '',
      point: null,
    },
  },
})
