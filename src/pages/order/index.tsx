import { motion } from 'framer-motion'
import { ArrowLeft, Package, Plus, Truck } from 'lucide-react'
import { useNavigate, useSearch } from '@tanstack/react-router'
import { useStore } from '@tanstack/react-form'
import { useMemo, useState } from 'react'
import { orderSchema } from '@/modules/orders'
import { useAppForm } from '@/shared/hooks/form'
import { useCategories } from '@/modules/characteristics'
import { Button } from '@/shared/components/ui/button'
import { Card } from '@/shared/components/ui/card'
import { Separator } from '@/shared/components/ui/separator'
import { OrderItemCard } from '@/pages/order/orderItem'
import { PriceDisplay, useCalculatePrice } from '@/modules/price'
import { orderDefaultValues } from '@/pages/order/sharedForm'
import { useCreateOrder } from '@/modules/orders/api/useCreateOrder'
import { RelayPointModal } from '@/pages/order/RelayPointModal'

export const OrderPage = () => {
  const navigate = useNavigate({ from: '/order' })
  const { name, email } = useSearch({ from: '/order/' })
  const { data: categories } = useCategories()
  const [isModalOpen, setModalOpen] = useState(false)
  const [step, setStep] = useState<1 | 2>(1)

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

  const deliveryType = useStore(
    form.store,
    (state) => state.values.delivery.type,
  )
  const count = useStore(form.store, (state) => state.values.items.length)
  const totalCount = useStore(form.store, (state) =>
    state.values.items.reduce((sum, item) => sum + (item.quantity || 0), 0),
  )
  const { data: price } = useCalculatePrice(totalCount, {
    enabled: !!totalCount,
  })
  const hasMissingPhoto = useStore(form.store, (state) =>
    state.values.items.some((item) => !item.photo.originImage),
  )

  return (
    <motion.div
      className="container mx-auto py-10 space-y-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
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

      {/* STEP 1 без form */}
      {step === 1 && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="p-6 shadow-md border-border/60 space-y-6">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <Package className="h-5 w-5 text-muted-foreground" />
                Produits
              </h2>

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
                    <div className="flex justify-around items-center pt-4 border-t">
                      <Button
                        type="button"
                        variant="outline"
                        className="flex flex-col items-center justify-center gap-2 rounded-full p-4 w-40 h-40 cursor-pointer"
                        onClick={() => arrayField.pushValue(createNewItem())}
                      >
                        <Plus className="!w-8 !h-8 text-gray-700" />
                        <p className="text-xs">Ajouter un produit</p>
                      </Button>
                    </div>
                  </>
                )}
              </form.Field>
            </Card>
          </motion.div>

          {/* Summary + navigation */}
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
                type="button"
                onClick={() => setStep(2)}
                disabled={hasMissingPhoto}
                title={
                  hasMissingPhoto
                    ? 'Ajoutez la photo originale pour chaque produit'
                    : ''
                }
              >
                Confirmer la commande
              </Button>
            </Card>
          </motion.div>
        </div>
      )}

      {/* STEP 2 — лише тут форма з onSubmit */}
      {step === 2 && (
        <form
          onSubmit={(e) => {
            e.preventDefault()
            form.handleSubmit()
          }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          <motion.div
            key="delivery-step"
            className="lg:col-span-2"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="p-6 space-y-6 border-border/60">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <Truck className="h-5 w-5 text-muted-foreground" />
                Livraison
              </h2>

              <div className="flex gap-4">
                <Button
                  type="button"
                  variant={deliveryType === 'home' ? 'default' : 'outline'}
                  onClick={() => {
                    form.setFieldValue('delivery.type', 'home')
                    form.setFieldValue('delivery.relay', undefined)
                  }}
                >
                  À domicile
                </Button>
                <Button
                  type="button"
                  variant={deliveryType === 'relay' ? 'default' : 'outline'}
                  onClick={() => {
                    form.setFieldValue('delivery.type', 'relay')
                    form.setFieldValue('delivery.address', undefined)
                  }}
                >
                  Point Relais
                </Button>
              </div>

              {deliveryType === 'home' && (
                <div className="grid grid-cols-1 gap-4">
                  <div className="grid gap-2">
                    <form.AppField name="delivery.address.name">
                      {(field) => <field.TextField label="Nom et prénom" />}
                    </form.AppField>
                  </div>
                  <div className="grid gap-2">
                    <form.AppField name="delivery.address.street">
                      {(field) => <field.TextField label="Adresse" />}
                    </form.AppField>
                  </div>
                  <div className="grid gap-2">
                    <form.AppField name="delivery.address.additional">
                      {(field) => (
                        <field.TextField
                          label="Informations supplémentaires"
                          placeholder="Étage, bâtiment, appartement, etc."
                        />
                      )}
                    </form.AppField>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <form.AppField name="delivery.address.postalCode">
                        {(field) => <field.TextField label="Code postal" />}
                      </form.AppField>
                    </div>
                    <div className="grid gap-2">
                      <form.AppField name="delivery.address.city">
                        {(field) => <field.TextField label="Ville" />}
                      </form.AppField>
                    </div>
                  </div>

                  <form.AppField name="delivery.address.phone">
                    {(field) => <field.TextField label="Téléphone portable" />}
                  </form.AppField>
                </div>
              )}

              {deliveryType === 'relay' && (
                <form.Field name="delivery.relay">
                  {(field) => (
                    <div className="space-y-4">
                      <form.AppField name="delivery.relay.phone">
                        {(field) => (
                          <field.TextField label="Téléphone portable" />
                        )}
                      </form.AppField>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setModalOpen(true)}
                      >
                        Choisir un point relais
                      </Button>

                      {field.state.value?.point && (
                        <div className="p-3 border rounded-md bg-muted/40">
                          <p className="font-medium">
                            {field.state.value.point.LgAdr1}
                          </p>
                          <p>
                            {field.state.value.point.CP}{' '}
                            {field.state.value.point.Ville}
                          </p>
                        </div>
                      )}

                      <RelayPointModal
                        open={isModalOpen}
                        onOpenChange={setModalOpen}
                        onSelect={(point: any) => {
                          form.setFieldValue('delivery.relay.point', point)
                          setModalOpen(false)
                        }}
                      />
                    </div>
                  )}
                </form.Field>
              )}
            </Card>
          </motion.div>

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
                Valider et payer
              </Button>

              <Button
                variant="ghost"
                type="button"
                size="sm"
                className="w-full mt-2 text-muted-foreground"
                onClick={() => setStep(1)}
              >
                ← Retour à la personnalisation
              </Button>
            </Card>
          </motion.div>
        </form>
      )}
    </motion.div>
  )
}
