import { Loader2 } from 'lucide-react'
import type { Category } from '@/modules/characteristics/types/types.ts'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card.tsx'
import { getFileLink } from '@/shared/api/utils.tsx'
import {
  CreateOption,
  DeleteCategory,
  DeleteOption,
  EditCategory,
  EditOption,
  OptionCard,
  useOptions,
} from '@/modules/characteristics'

export const CategoryBlock = ({ item }: { item: Category }) => {
  const { data, isLoading } = useOptions(item.id)
  return (
    <Card>
      <CardHeader className="flex justify-between items-center">
        <CardTitle className="flex gap-2 items-center">
          {item.iconUrl && (
            <img
              src={getFileLink(item.iconUrl)}
              alt=""
              className="w-20 h-20 rounded-lg"
            />
          )}
          {item.title}
        </CardTitle>
        <div className="flex gap-2 items-center">
          <EditCategory category={item} />
          <CreateOption categoryId={item.id} />
          <DeleteCategory id={item.id} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-3 justify-center">
          {isLoading && (
            <div className="h-full w-full flex items-center justify-center">
              <Loader2 size={30} className="animate-spin" />
            </div>
          )}
          {data &&
            data.map((item) => {
              return (
                <OptionCard
                  option={item}
                  key={item.id}
                  actions={
                    <>
                      <EditOption option={item} />
                      <DeleteOption optionId={item.id} />
                    </>
                  }
                />
              )
            })}
        </div>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  )
}
