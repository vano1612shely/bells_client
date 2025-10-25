import { useEffect, useState } from 'react'
import { Plus } from 'lucide-react'
import type { CreateBackTemplateInput } from '@/modules/back-templates/models/createBackTemplate.schema.ts'
import { useCreateBackTemplate } from '@/modules/back-templates/api/useCreateBackTemplate.ts'
import { useAppForm } from '@/shared/hooks/form.ts'
import { createBackTemplateSchema } from '@/modules/back-templates/models/createBackTemplate.schema.ts'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from '@/shared/components/ui/dialog.tsx'
import { Button } from '@/shared/components/ui/button.tsx'

export const CreateBackTemplate = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [imageFile, setImageFile] = useState<File | undefined>(undefined)
  const [thumbnailFile, setThumbnailFile] = useState<File | undefined>(
    undefined,
  )

  const { handleCreate, isPending } = useCreateBackTemplate({
    onSuccess: () => {
      setIsOpen(false)
    },
  })

  // Припускаємо використання вашої form системи
  const form = useAppForm({
    defaultValues: {
      title: '',
      description: '',
      isActive: true,
      sortOrder: 0,
    } as CreateBackTemplateInput,
    validators: {
      onSubmit: createBackTemplateSchema,
    },
    onSubmit: ({ value }) => {
      handleCreate({
        ...value,
        image: imageFile,
        thumbnail: thumbnailFile,
      })
    },
  })

  useEffect(() => {
    if (isOpen) {
      form.reset()
      setImageFile(undefined)
      setThumbnailFile(undefined)
    }
  }, [isOpen])

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="flex gap-2 items-center">
          Створити шаблон <Plus />
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
          <DialogHeader>Створення шаблону задньої частини</DialogHeader>
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
            <form.AppField
              name="sortOrder"
              children={(field) => (
                <field.TextField
                  label="Порядок сортування"
                  placeholder="0"
                  type="number"
                />
              )}
            />
          </div>
          <DialogFooter>
            <Button isLoading={isPending} type="submit">
              Створити
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
