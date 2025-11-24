import { Pencil } from 'lucide-react'
import { useEffect, useState } from 'react'
import type {
  BackTemplate,
  CreateBackTemplateInput,
} from '@/modules/back-templates'
import { useUpdateBackTemplate } from '@/modules/back-templates/api/useUpdateBackTemplate'
import { createBackTemplateSchema } from '@/modules/back-templates'
import { useAppForm } from '@/shared/hooks/form'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from '@/shared/components/ui/dialog'
import { Button } from '@/shared/components/ui/button'

export const EditBackTemplate = ({ template }: { template: BackTemplate }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [imageFile, setImageFile] = useState<File | undefined>()
  const [thumbnailFile, setThumbnailFile] = useState<File | undefined>()

  const { handleUpdate, isPending } = useUpdateBackTemplate({
    onSuccess: () => setIsOpen(false),
  })

  const form = useAppForm({
    defaultValues: {
      title: template.title,
      description: template.description || '',
    } as CreateBackTemplateInput,
    validators: {
      onSubmit: createBackTemplateSchema,
    },
    onSubmit: ({ value }) => {
      handleUpdate({
        id: template.id,
        data: {
          ...value,
          image: imageFile,
          thumbnail: thumbnailFile,
        },
      })
    },
  })

  useEffect(() => {
    if (isOpen) {
      form.reset()
      form.setFieldValue('title', template.title)
      form.setFieldValue('description', template.description || '')
      setImageFile(undefined)
      setThumbnailFile(undefined)
    }
  }, [isOpen, template.title, template.description, form])

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          size="sm"
          variant="secondary"
          className="flex items-center gap-1"
        >
          <Pencil size={16} />
          Редагувати
        </Button>
      </DialogTrigger>
      <DialogContent>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            e.stopPropagation()
            void form.handleSubmit()
          }}
        >
          <DialogHeader>Редагування заднього шаблону</DialogHeader>
          <div className="flex flex-col gap-3 mt-4 mb-4">
            <form.AppField
              name="title"
              children={(field) => (
                <field.TextField
                  label="Назва"
                  placeholder="Назва шаблону"
                  type="text"
                />
              )}
            />
            <form.AppField
              name="description"
              children={(field) => (
                <field.TextField
                  label="Опис"
                  placeholder="Опис шаблону"
                  type="text"
                />
              )}
            />
            <div>
              <label className="text-sm font-medium">Зображення</label>
              <input
                className="w-full p-1 px-2 border rounded-xl mt-1"
                type="file"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files?.[0])}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Мініатюра</label>
              <input
                className="w-full p-1 px-2 border rounded-xl mt-1"
                type="file"
                accept="image/*"
                onChange={(e) => setThumbnailFile(e.target.files?.[0])}
              />
            </div>
          </div>
          <DialogFooter>
            <Button isLoading={isPending} type="submit">
              Зберегти
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
