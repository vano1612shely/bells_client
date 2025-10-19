import { Plus } from 'lucide-react'
import { useEffect, useState } from 'react'
import type { CreateOptionInput } from '@/modules/characteristics'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from '@/shared/components/ui/dialog'
import { Button } from '@/shared/components/ui/button'
import { useAppForm } from '@/shared/hooks/form'
import { createOptionSchema, useCreateOption } from '@/modules/characteristics'

export const CreateOption = ({ categoryId }: { categoryId: string }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [smallFile, setSmallFile] = useState<File | undefined>()
  const [largeFile, setLargeFile] = useState<File | undefined>()

  const { handleCreate, isPending } = useCreateOption({
    onSuccess: () => setIsOpen(false),
  })

  const form = useAppForm({
    defaultValues: {
      category_id: categoryId,
      title: '',
      metadata: {
        colorHex: undefined,
      },
    } as CreateOptionInput,
    validators: {
      onSubmit: createOptionSchema,
    },
    onSubmit: ({ value }) => {
      handleCreate({ ...value, small: smallFile, large: largeFile })
    },
  })
  useEffect(() => {
    if (isOpen) form.reset()
  }, [isOpen])
  useEffect(() => {
    if (categoryId) form.setFieldValue('category_id', categoryId)
  }, [categoryId])
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="flex gap-2 items-center">
          Створити опцію <Plus />
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
          <DialogHeader>Створення опції</DialogHeader>

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

            <form.AppField
              name="metadata.colorHex"
              children={(field) => (
                <field.TextField
                  label="Колір (hex)"
                  placeholder="#FFFFFF"
                  type="text"
                />
              )}
            />

            <div className="flex flex-col gap-2">
              <label className="text-sm">Мале зображення</label>
              <input
                className="p-1 px-2 border rounded-xl"
                type="file"
                accept="image/*"
                onChange={(e) => setSmallFile(e.target.files?.[0])}
              />

              <label className="text-sm">Велике зображення</label>
              <input
                className="p-1 px-2 border rounded-xl"
                type="file"
                accept="image/*"
                onChange={(e) => setLargeFile(e.target.files?.[0])}
              />
            </div>
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
