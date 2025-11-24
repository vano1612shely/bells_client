import { Trash } from 'lucide-react'
import { Button } from '@/shared/components/ui/button'
import { useDeleteOption } from '@/modules/characteristics'

type Props = {
  optionId: string
}

export const DeleteOption = ({ optionId }: Props) => {
  const { handleDelete, isPending } = useDeleteOption()

  return (
    <Button
      size="icon"
      variant="destructive"
      isLoading={isPending}
      onClick={() => handleDelete({ optionId })}
    >
      <Trash size={16} />
    </Button>
  )
}
