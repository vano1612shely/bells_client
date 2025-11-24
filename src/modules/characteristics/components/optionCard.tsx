import type { ReactNode } from 'react'
import type { Option } from '@/modules/characteristics'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/shared/components/ui/hover-card'
import { getFileLink } from '@/shared/api/utils'

type Props = {
  option: Option
  actions?: ReactNode
}

export const OptionCard = ({ option, actions }: Props) => {
  return (
    <Card className="relative w-52 gap-1 cursor-pointer hover:shadow-lg transition-shadow duration-200">
      {actions && (
        <div className="absolute top-2 right-2 z-10 flex gap-1">{actions}</div>
      )}
      <HoverCard openDelay={100} closeDelay={100}>
        <HoverCardTrigger asChild>
          <div>
            <CardHeader className="p-2 flex items-center justify-center">
              {option.smallImageUrl ? (
                <img
                  src={getFileLink(option.smallImageUrl)}
                  alt={option.title}
                  className="w-20 h-20 object-contain rounded-md"
                />
              ) : (
                <div className="w-20 h-20 rounded-md bg-gray-100 flex items-center justify-center text-sm text-gray-500">
                  no image
                </div>
              )}
            </CardHeader>

            <CardContent className="p-1 flex flex-col items-center text-center gap-1">
              <CardTitle className="text-sm font-medium">
                {option.title}
              </CardTitle>
              {option.metadata?.colorHex && (
                <div
                  className="w-5 h-5 rounded-full border"
                  style={{ backgroundColor: option.metadata.colorHex }}
                  title={option.metadata.colorHex}
                />
              )}
            </CardContent>
          </div>
        </HoverCardTrigger>

        {option.largeImageUrl && (
          <HoverCardContent className="w-80 p-2">
            <img
              src={getFileLink(option.largeImageUrl)}
              alt={option.title}
              className="w-full h-auto object-contain rounded-md"
            />
          </HoverCardContent>
        )}
      </HoverCard>
    </Card>
  )
}
