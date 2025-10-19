import { Trash } from 'lucide-react'
import { Button } from '@/shared/components/ui/button.tsx'
import { useDeleteCategory } from '@/modules/characteristics'

export const DeleteCategory = ({ id }: { id: string }) => {
  const { handleDelete, isPending } = useDeleteCategory()
  return (
    <Button
      variant="destructive"
      isLoading={isPending}
      onClick={() => handleDelete(id)}
    >
      <Trash />
    </Button>
  )
}
