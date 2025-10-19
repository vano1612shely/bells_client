import { Plus } from 'lucide-react'
import { useEffect, useState } from 'react'
import type { CreateCategoryInput } from '@/modules/characteristics'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from '@/shared/components/ui/dialog'
import { Button } from '@/shared/components/ui/button.tsx'
import { useAppForm } from '@/shared/hooks/form.ts'
import {
  createCategorySchema,
  useCreateCategory,
} from '@/modules/characteristics'

export const CreateCategory = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { handleCreate, isPending } = useCreateCategory({
    onSuccess: () => {
      setIsOpen(false)
    },
  })
  const [file, setFile] = useState<File | undefined>(undefined)
  const form = useAppForm({
    defaultValues: {
      title: '',
      icon: undefined,
    } as CreateCategoryInput,
    validators: {
      onSubmit: createCategorySchema,
    },
    onSubmit: ({ value }) => {
      handleCreate({ ...value, icon: file })
    },
  })
  useEffect(() => {
    if (isOpen) form.reset()
  }, [isOpen])
  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button className="flex gap-2 items-center">
            Створити категорії <Plus />
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
            <DialogHeader>Створення категорії</DialogHeader>
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
                Створити
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}
