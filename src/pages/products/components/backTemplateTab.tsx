import { Loader2 } from 'lucide-react'
import { CreateBackTemplate, useBackTemplates } from '@/modules/back-templates'
import { BackTemplateBlock } from '@/pages/products/components/backTemplateBlock.tsx'

export const BackTemplatesTab = () => {
  const { data, isLoading } = useBackTemplates()

  if (isLoading) {
    return (
      <div className="h-64 w-full flex items-center justify-center">
        <Loader2 size={30} className="animate-spin" />
      </div>
    )
  }

  return (
    <div className="w-full flex flex-col">
      <div className="w-full flex justify-end mb-5">
        <CreateBackTemplate />
      </div>
      <div className="flex flex-col gap-3">
        {data?.length === 0 ? (
          <p className="text-center text-gray-500 py-8">
            Немає шаблонів задньої частини
          </p>
        ) : (
          data?.map((template) => (
            <BackTemplateBlock template={template} key={template.id} />
          ))
        )}
      </div>
    </div>
  )
}
