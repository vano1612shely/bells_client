import { useState } from 'react'
import type { CreateDiscountInput } from '@/modules/discounts'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from '@/shared/components/ui/dialog.tsx'
import { Button } from '@/shared/components/ui/button.tsx'
import { useAppForm } from '@/shared/hooks/form.ts'
import { createDiscountSchema } from '@/modules/discounts'
import { useCreateDiscount } from '@/modules/discounts/api/useCreateDiscount.ts'

export const CreateDiscount = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { handleCreate, isPending } = useCreateDiscount({
    onSuccess: () => setIsOpen(false),
  })
  const form = useAppForm({
    defaultValues: {
      count: 0,
      discount: 0,
    } as CreateDiscountInput,
    validators: {
      onSubmit: createDiscountSchema,
    },
    onSubmit: ({ value }) => {
      handleCreate(value)
    },
  })
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>Створити скидку</Button>
      </DialogTrigger>
      <DialogContent>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            e.stopPropagation()
            void form.handleSubmit()
          }}
        >
          <DialogHeader>Створити скидку</DialogHeader>
          <div className="flex flex-col gap-2 mt-2 mb-2">
            <form.AppField
              name="count"
              children={(field) => (
                <field.TextField
                  label="Кількість товару"
                  placeholder="Кількість товару"
                  type="number"
                />
              )}
            />
            <form.AppField
              name="discount"
              children={(field) => (
                <field.TextField
                  label="Скидка в %"
                  placeholder="Скидка в %"
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
