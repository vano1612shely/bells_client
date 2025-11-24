import { Pencil } from 'lucide-react'
import { useEffect, useState } from 'react'
import type { CreateOptionInput, Option } from '@/modules/characteristics'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from '@/shared/components/ui/dialog'
import { Button } from '@/shared/components/ui/button'
import { useAppForm } from '@/shared/hooks/form'
import { createOptionSchema, useUpdateOption } from '@/modules/characteristics'

export const EditOption = ({ option }: { option: Option }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [smallFile, setSmallFile] = useState<File | undefined>()
  const [largeFile, setLargeFile] = useState<File | undefined>()
  const { handleUpdate, isPending } = useUpdateOption({
    onSuccess: () => setIsOpen(false),
  })

  const form = useAppForm({
    defaultValues: {
      category_id: option.categoryId,
      title: option.title,
      metadata: {
        colorHex: option.metadata?.colorHex || '',
      },
    } as CreateOptionInput,
    validators: {
      onSubmit: createOptionSchema,
    },
    onSubmit: ({ value }) => {
      const payload = {
        ...value,
        metadata: value.metadata?.colorHex ? value.metadata : undefined,
      }

      if (smallFile || largeFile) {
        const formData = new FormData()
        formData.append('title', value.title)
        formData.append('category_id', value.category_id)
        if (payload.metadata) {
          formData.append('metadata', JSON.stringify(payload.metadata))
        }
        if (smallFile) formData.append('small', smallFile)
        if (largeFile) formData.append('large', largeFile)
        handleUpdate({
          optionId: option.id,
          data: formData,
        })
        return
      }

      handleUpdate({
        optionId: option.id,
        data: payload,
      })
    },
  })

  useEffect(() => {
    if (isOpen) {
      form.reset()
      form.setFieldValue('title', option.title)
      form.setFieldValue('category_id', option.categoryId)
      form.setFieldValue('metadata.colorHex', option.metadata?.colorHex || '')
      setSmallFile(undefined)
      setLargeFile(undefined)
    }
  }, [isOpen, option.title, option.categoryId, option.metadata?.colorHex, form])

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="icon" variant="secondary">
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
          <DialogHeader>Редагування опції</DialogHeader>

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
              <label className="text-sm">Маленьке зображення</label>
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
              Зберегти
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
