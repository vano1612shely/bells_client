export const CHARACTERISTICS_URL = {
  categories: '/categories',
  category: (id: number | string) => `/categories/${id}`,
  options: (categoryId: number | string) => `/categories/${categoryId}/options`,
  option: ( optionId: number | string) =>
    `/options/${optionId}`,
}
