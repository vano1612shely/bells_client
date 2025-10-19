import { Loader2 } from 'lucide-react'
import { CreateCategory, useCategories } from '@/modules/characteristics'
import { CategoryBlock } from '@/pages/products/components/categoryBlock.tsx'

export const Products = () => {
  const { data, isLoading } = useCategories()
  if (isLoading)
    return (
      <div className="h-full w-full flex items-center justify-center">
        <Loader2 size={30} className="animate-spin" />
      </div>
    )
  return (
    <div className="w-full flex flex-col">
      <div className="w-full flex justify-end mb-5">
        <CreateCategory />
      </div>
      <div className="flex flex-col gap-3">
        {data?.map((category) => (
          <CategoryBlock item={category} key={category.id} />
        ))}
      </div>
    </div>
  )
}
