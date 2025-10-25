import { motion } from 'framer-motion'
import { ArrowLeft, Plus } from 'lucide-react'
import { useNavigate, useSearch } from '@tanstack/react-router'
import { useStore } from '@tanstack/react-form'
import { useMemo } from 'react'
import { orderSchema } from '@/modules/orders'
import { useAppForm } from '@/shared/hooks/form'
import { useCategories } from '@/modules/characteristics'
import { Button } from '@/shared/components/ui/button'
import { Card } from '@/shared/components/ui/card'
import { Separator } from '@/shared/components/ui/separator'
import { OrderItemCard } from '@/pages/order/orderItem.tsx'
import { PriceDisplay, useCalculatePrice } from '@/modules/price'
import { orderDefaultValues } from '@/pages/order/sharedForm.ts'
import { useCreateOrder } from '@/modules/orders/api/useCreateOrder.ts'

export const OrderPage = () => {
  const navigate = useNavigate({ from: '/order' })
  const { name, email } = useSearch({ from: '/order/' })
  const { data: categories } = useCategories()
  const defaultValues = useMemo(
    () => orderDefaultValues(email, name, categories),
    [name, email, categories],
  )
  const { handleCreate, isPending } = useCreateOrder({
    onSuccess: (data) => {
      navigate({ to: `/order/${data.id}` })
    },
  })
  const form = useAppForm({
    defaultValues,
    validators: {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      onSubmit: orderSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        const parsed = orderSchema.parse(value)
        handleCreate(parsed)
      } catch (error) {
        console.error('Erreur de validation:', error)
      }
    },
  })
  const createNewItem = () => ({
    quantity: 1,
    characteristics:
      categories?.reduce(
        (acc, category) => {
          if (category.options.length > 0) {
            acc[category.title] = category.options[0].title
          }
          return acc
        },
        {} as Record<string, string>,
      ) || {},
    photo: {
      originImage: null!,
      image: null!,
    },
  })

  const count = useStore(form.store, (state) => state.values.items.length)
  const totalCount = useStore(form.store, (state) =>
    state.values.items.reduce((sum, item) => sum + (item.quantity || 0), 0),
  )
  const { data: price } = useCalculatePrice(totalCount, {
    enabled: !!totalCount,
  })

  return (
    <motion.div
      className="container mx-auto py-10 space-y-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* HEADER */}
      <header className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate({ to: '/' })}
            className="rounded-full"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">
            Passer la commande
          </h1>
        </div>
      </header>

      <Separator />

      <form
        onSubmit={(e) => {
          e.preventDefault()
          form.handleSubmit()
        }}
        className="grid grid-cols-1 lg:grid-cols-3 gap-8"
      >
        {/* LEFT */}
        <motion.div
          className="lg:col-span-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="p-6 shadow-md border-border/60 space-y-6">
            <form.Field name="items" mode="array">
              {(arrayField) => (
                <>
                  <div className="space-y-6">
                    {arrayField.state.value.map((_item, index) => (
                      <OrderItemCard
                        key={index}
                        index={index}
                        arrayField={arrayField}
                        categories={categories}
                        form={form}
                      />
                    ))}
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => arrayField.pushValue(createNewItem())}
                    >
                      <Plus className="mr-2 h-4 w-4" /> Ajouter un produit
                    </Button>
                  </div>
                </>
              )}
            </form.Field>
          </Card>
        </motion.div>

        {/* RIGHT: SUMMARY */}
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="p-6 shadow-md border-border/60 sticky top-24">
            <h2 className="text-xl font-semibold mb-4">
              Résumé de la commande
            </h2>

            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex justify-between">
                <span>Nombre de produits</span>
                <span>{count}</span>
              </div>
              <div className="flex justify-between">
                <span>Quantité totale</span>
                <span>{totalCount}</span>
              </div>
              <div className="flex justify-between font-semibold text-foreground pt-2 border-t mt-2">
                <span>Total à payer</span>
                {price && <PriceDisplay price={price} />}
              </div>
            </div>

            <Button
              className="w-full mt-6"
              size="lg"
              type="submit"
              isLoading={isPending}
            >
              Confirmer la commande
            </Button>
          </Card>
        </motion.div>
      </form>
    </motion.div>
  )
}
