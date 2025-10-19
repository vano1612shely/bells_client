import { Trash2, X } from 'lucide-react'
import type { Category } from '@/modules/characteristics'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card'
import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'
import { Label } from '@/shared/components/ui/label'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/shared/components/ui/hover-card'
import { cn } from '@/shared/lib/utils'
import { getFileLink } from '@/shared/api/utils'
import { BallPhotoEditor } from '@/pages/order/constructor.tsx'

interface OrderItemCardProps {
  index: number
  arrayField: any
  categories?: Array<Category>
  form: any
}

export const OrderItemCard = ({
  index,
  arrayField,
  categories,
  form,
}: OrderItemCardProps) => {
  return (
    <Card className="overflow-hidden border shadow-sm">
      <CardHeader className="flex flex-row justify-between items-center bg-muted/40 px-4 py-3">
        <CardTitle className="text-lg font-semibold">
          Produit {index + 1}
        </CardTitle>

        {arrayField.state.value.length > 1 && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => arrayField.removeValue(index)}
            className="text-destructive hover:text-destructive"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        )}
      </CardHeader>

      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
        {/* Left column: Photo editor */}
        <form.Field name={`items[${index}].photo`}>
          {(field: any) => (
            <div className="flex flex-col space-y-2">
              <Label>Photo pour la boule</Label>
              {!field.state.value?.originImage ? (
                <div>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) {
                        field.handleChange({
                          originImage: file,
                          image: null,
                        })
                      }
                    }}
                  />
                  <p className="text-xs text-muted-foreground mt-2">
                    Téléchargez la photo qui sera sur la boule
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  <BallPhotoEditor
                    file={field.state.value.originImage}
                    onChange={(editedFile) =>
                      field.handleChange({
                        ...field.state.value,
                        image: editedFile,
                      })
                    }
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => field.handleChange(null)}
                    className="w-full"
                  >
                    <X className="h-4 w-4 mr-2" />
                    Supprimer la photo
                  </Button>
                </div>
              )}
            </div>
          )}
        </form.Field>

        {/* Right column: quantity and options */}
        <div className="space-y-4">
          <form.Field name={`items[${index}].quantity`}>
            {(field: any) => (
              <div className="flex flex-col space-y-2">
                <Label htmlFor={`quantity-${index}`}>Quantité</Label>
                <Input
                  id={`quantity-${index}`}
                  type="number"
                  min={1}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(Number(e.target.value))}
                />
              </div>
            )}
          </form.Field>

          {categories?.map((category) => (
            <form.Field
              key={category.id}
              name={`items[${index}].characteristics.${category.title}`}
            >
              {(field: any) => (
                <div className="flex flex-col space-y-2">
                  <Label>{category.title}</Label>
                  <div className="flex gap-2 flex-wrap">
                    {category.options.map((option) => (
                      <HoverCard key={option.id} openDelay={200} closeDelay={0}>
                        <HoverCardTrigger asChild>
                          <button
                            type="button"
                            onClick={() => field.handleChange(option.title)}
                            className={cn(
                              'relative w-12 h-12 rounded-md border-2 transition-all overflow-hidden',
                              field.state.value === option.title
                                ? 'border-primary ring-2 ring-primary/20'
                                : 'border-border hover:border-primary/50',
                            )}
                            style={{
                              backgroundColor: option.metadata?.colorHex,
                            }}
                          >
                            {option.smallImageUrl ? (
                              <img
                                src={getFileLink(option.smallImageUrl)}
                                alt={option.title}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <span className="text-xs text-center px-1">
                                {option.title}
                              </span>
                            )}
                          </button>
                        </HoverCardTrigger>
                        <HoverCardContent className="w-60 p-2">
                          {option.largeImageUrl && (
                            <img
                              src={getFileLink(option.largeImageUrl)}
                              alt={option.title}
                              className="w-full h-auto rounded-md"
                            />
                          )}
                          <div className="p-4 text-center text-sm text-muted-foreground">
                            {option.title}
                          </div>
                        </HoverCardContent>
                      </HoverCard>
                    ))}
                  </div>
                </div>
              )}
            </form.Field>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
