import { Pencil } from 'lucide-react'
import { useEffect, useState } from 'react'
import type { Category, CreateCategoryInput } from '@/modules/characteristics'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from '@/shared/components/ui/dialog'
import { Button } from '@/shared/components/ui/button'
import { useAppForm } from '@/shared/hooks/form'
import { createCategorySchema, useUpdateCategory } from '@/modules/characteristics'

export const EditCategory = ({ category }: { category: Category }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [file, setFile] = useState<File | undefined>(undefined)
  const { handleUpdate, isPending } = useUpdateCategory({
    onSuccess: () => setIsOpen(false),
  })

  const form = useAppForm({
    defaultValues: {
      title: category.title,
      icon: undefined,
    } as CreateCategoryInput,
    validators: {
      onSubmit: createCategorySchema,
    },
    onSubmit: ({ value }) => {
      const payload =
        file !== undefined
          ? (() => {
              const formData = new FormData()
              formData.append('title', value.title)
              formData.append('icon', file)
              return formData
            })()
          : { title: value.title }

      handleUpdate({ id: category.id, data: payload })
    },
  })

  useEffect(() => {
    if (isOpen) {
      form.reset()
      form.setFieldValue('title', category.title)
      setFile(undefined)
    }
  }, [isOpen, category.title, form])

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary" size="icon">
          <Pencil size={16} />
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
          <DialogHeader>Редагування категорії</DialogHeader>
          <div className="flex flex-col gap-2 mt-2 mb-2">
            <form.AppField
              name="title"
              children={(field) => (
                <field.TextField
                  label="Назва"
                  placeholder="Назва"
                  type="text"
                />
              )}
            />
            <input
              className="p-1 px-2 border rounded-xl"
              type="file"
              placeholder="Іконка"
              onChange={(e) => setFile(e.target.files?.[0])}
            />
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
