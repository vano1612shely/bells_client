import { useState } from 'react'
import { Loader2 } from 'lucide-react'
import { CreateCategory, useCategories } from '@/modules/characteristics'
import { CategoryBlock } from '@/pages/products/components/categoryBlock.tsx'
import { BackTemplatesTab } from '@/pages/products/components/backTemplateTab.tsx'

export const Products = () => {
  const [activeTab, setActiveTab] = useState<
    'characteristics' | 'back-templates'
  >('characteristics')

  // Припускаємо, що у вас вже є компонент Products для характеристик
  const { data: categories, isLoading: categoriesLoading } = useCategories()

  return (
    <div className="w-full flex flex-col">
      {/* Таби */}
      <div className="border-b mb-6">
        <div className="flex gap-4">
          <button
            onClick={() => setActiveTab('characteristics')}
            className={`px-4 py-2 font-medium border-b-2 transition-colors ${
              activeTab === 'characteristics'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            Характеристики
          </button>
          <button
            onClick={() => setActiveTab('back-templates')}
            className={`px-4 py-2 font-medium border-b-2 transition-colors ${
              activeTab === 'back-templates'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            Задня частина
          </button>
        </div>
      </div>

      {/* Контент табів */}
      <div className="w-full">
        {activeTab === 'characteristics' ? (
          // Ваш існуючий компонент Products з характеристиками
          <div className="w-full flex flex-col">
            <div className="w-full flex justify-end mb-5">
              <CreateCategory />
            </div>
            <div className="flex flex-col gap-3">
              {categoriesLoading ? (
                <div className="h-64 w-full flex items-center justify-center">
                  <Loader2 size={30} className="animate-spin" />
                </div>
              ) : (
                categories?.map((category) => (
                  <CategoryBlock item={category} key={category.id} />
                ))
              )}
            </div>
          </div>
        ) : (
          <BackTemplatesTab />
        )}
      </div>
    </div>
  )
}
