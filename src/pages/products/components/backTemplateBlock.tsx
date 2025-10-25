import { Loader2, Trash2 } from 'lucide-react'
import type { BackTemplate } from '@/modules/back-templates/types'
import { useDeleteBackTemplate } from '@/modules/back-templates'
import { Button } from '@/shared/components/ui/button.tsx'
import { getFileLink } from '@/shared/api/utils.tsx'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/shared/components/ui/hover-card'

export const BackTemplateBlock = ({ template }: { template: BackTemplate }) => {
  const { handleDelete, isPending } = useDeleteBackTemplate()

  return (
    <div className="border rounded-lg p-4 flex items-center justify-between hover:shadow-md transition-shadow">
      <div className="flex items-center gap-4">
        {template.thumbnailPath ? (
          <HoverCard openDelay={150} closeDelay={0}>
            <HoverCardTrigger asChild>
              <img
                src={getFileLink(template.thumbnailPath)}
                alt={template.title}
                className="w-16 h-16 object-cover rounded cursor-pointer hover:ring-2 hover:ring-primary/50 transition-all"
              />
            </HoverCardTrigger>

            <HoverCardContent
              side="top"
              align="center"
              className="w-72 p-2 z-50"
            >
              <img
                src={getFileLink(template.imagePath)}
                alt={template.title}
                className="w-full h-auto rounded-md"
              />
              <div className="mt-2 text-center">
                <h4 className="font-medium text-base">{template.title}</h4>
                {template.description && (
                  <p className="text-sm text-muted-foreground mt-1">
                    {template.description}
                  </p>
                )}
              </div>
            </HoverCardContent>
          </HoverCard>
        ) : null}

        <div>
          <h3 className="font-semibold text-lg">{template.title}</h3>
          {template.description && (
            <p className="text-sm text-gray-600">{template.description}</p>
          )}
        </div>
      </div>

      <Button
        variant="destructive"
        size="sm"
        onClick={() => handleDelete(template.id)}
        disabled={isPending}
      >
        {isPending ? (
          <Loader2 className="animate-spin" size={16} />
        ) : (
          <Trash2 size={16} />
        )}
      </Button>
    </div>
  )
}
