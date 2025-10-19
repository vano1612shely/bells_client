import { Trash } from 'lucide-react'
import { Button } from '@/shared/components/ui/button.tsx'
import { useDeleteDiscount } from '@/modules/discounts'

export const DeleteDiscount = ({ id }: { id: string }) => {
  const { handleDelete, isPending } = useDeleteDiscount()
  return (
    <Button
      variant="destructive"
      onClick={() => handleDelete(id)}
      isLoading={isPending}
    >
      <Trash />
    </Button>
  )
}
