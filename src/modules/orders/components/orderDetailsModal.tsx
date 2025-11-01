import { Download, Eye, Home, MapPin, Phone } from 'lucide-react'
import { useState } from 'react'
import type { Order } from '@/modules/orders/types'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/components/ui/dialog.tsx'
import { Card, CardContent } from '@/shared/components/ui/card.tsx'
import { Separator } from '@/shared/components/ui/separator.tsx'
import { Button } from '@/shared/components/ui/button.tsx'
import { StatusBadge } from '@/modules/orders/components/statusBadge.tsx'
import { getFileLink } from '@/shared/api/utils.tsx'
import { formatPrice } from '@/shared/lib/utils.ts'
import { useBackTemplate } from '@/modules/back-templates'

const ImageWithDownload = ({ src, alt }: { src: string; alt: string }) => {
  const handleDownload = async () => {
    try {
      const response = await fetch(src)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `${alt}-${Date.now()}.jpg`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Помилка завантаження:', error)
    }
  }

  return (
    <div className="relative group">
      <img src={src} alt={alt} className="w-24 h-24 object-cover rounded-md" />
      <button
        onClick={handleDownload}
        className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 rounded-md flex items-center justify-center opacity-0 group-hover:opacity-80 cursor-pointer"
        title="Завантажити фото"
      >
        <Download className="w-6 h-6 text-white" />
      </button>
    </div>
  )
}

export const OrderDetailsModal = ({ order }: { order: Order }) => {
  const [open, setOpen] = useState(false)

  const formatDate = (date: string) =>
    new Date(date).toLocaleString('uk-UA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button
          size="icon"
          variant="ghost"
          className="p-2 text-blue-600 hover:bg-blue-50 rounded cursor-pointer"
          title="Переглянути"
        >
          <Eye className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Деталі замовлення</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Основна інформація */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Ім'я</p>
              <p className="font-medium">{order.name}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="font-medium">{order.email}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Статус</p>
              <StatusBadge status={order.status} lang={'ua'} />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Дата створення</p>
              <p className="font-medium">{formatDate(order.createdAt)}</p>
            </div>
          </div>

          <Separator />

          {/* Інформація про доставку */}
          <Card>
            <CardContent className="pt-6 space-y-4">
              <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Інформація про доставку
              </h3>

              {order.delivery.type === 'home' && (
                <div className="space-y-1 text-sm">
                  <p>
                    <Home className="inline-block h-4 w-4 mr-1" />
                    <span className="font-medium">Тип:</span> Доставка додому
                  </p>
                  <p>
                    <span className="font-medium">Ім’я отримувача:</span>{' '}
                    {order.delivery.name}
                  </p>
                  <p>
                    <span className="font-medium">Адреса:</span>{' '}
                    {order.delivery.street}
                  </p>
                  {order.delivery.additional && (
                    <p>
                      <span className="font-medium">Додатково:</span>{' '}
                      {order.delivery.additional}
                    </p>
                  )}
                  <p>
                    <span className="font-medium">Поштовий індекс:</span>{' '}
                    {order.delivery.postalCode}
                  </p>
                  <p>
                    <span className="font-medium">Місто:</span>{' '}
                    {order.delivery.city}
                  </p>
                  <p>
                    <Phone className="inline-block h-4 w-4 mr-1" />
                    <span className="font-medium">Телефон:</span>{' '}
                    {order.delivery.phone}
                  </p>
                </div>
              )}

              {order.delivery.type === 'relay' && (
                <div className="space-y-1 text-sm">
                  <p>
                    <MapPin className="inline-block h-4 w-4 mr-1" />
                    <span className="font-medium">Тип:</span> Доставка у пункт
                    видачі
                  </p>
                  <p>
                    <Phone className="inline-block h-4 w-4 mr-1" />
                    <span className="font-medium">Телефон:</span>{' '}
                    {order.delivery.relayPhone}
                  </p>

                  {order.delivery.relayPoint && (
                    <div className="mt-2 border rounded-md p-3 bg-muted/40">
                      <p className="font-medium">
                        {order.delivery.relayPoint.name}
                      </p>
                      <p>{order.delivery.relayPoint.address}</p>
                      <p>
                        {order.delivery.relayPoint.cp}{' '}
                        {order.delivery.relayPoint.city},{' '}
                        {order.delivery.relayPoint.Pays}
                      </p>
                      {order.delivery.relayPoint.lat && (
                        <p className="text-muted-foreground text-xs mt-1">
                          Координати: {order.delivery.relayPoint.lat.toFixed(5)}
                          , {order.delivery.relayPoint.lon?.toFixed(5)}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          <Separator />

          {/* Ціни */}
          <Card>
            <CardContent className="pt-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Ціна за одиницю
                  </p>
                  <p className="font-medium">
                    {formatPrice(order.pricePerUnit)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Кількість</p>
                  <p className="font-medium">{order.totalQuantity} шт</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    Сума без знижки
                  </p>
                  <p className="font-medium">{formatPrice(order.totalPrice)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Знижка</p>
                  <p className="font-medium text-green-600">
                    {formatPrice(order.discount)}
                  </p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-muted-foreground">
                    Загальна сума зі знижкою
                  </p>
                  <p className="text-xl font-bold text-primary">
                    {formatPrice(order.totalPriceWithDiscount)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Separator />

          {/* Список товарів */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              Товари ({order.items.length || 0})
            </h3>
            <div className="space-y-4">
              {order.items.map((item) => {
                const { data: backTemplate } = useBackTemplate(
                  item.backTemplateId || '',
                  {
                    enabled:
                      !!item.backTemplateId && item.backSideType === 'template',
                  },
                )

                return (
                  <Card key={item.id}>
                    <CardContent className="pt-6 space-y-4">
                      <div className="flex gap-4 flex-wrap">
                        {/* Передня частина */}
                        <div className="flex flex-col gap-2">
                          <p className="text-sm font-medium text-center">
                            Передня частина
                          </p>
                          <div className="flex gap-2">
                            {item.originImagePath && (
                              <ImageWithDownload
                                src={getFileLink(item.originImagePath)}
                                alt="Оригінал передньої"
                              />
                            )}
                            {item.imagePath && (
                              <ImageWithDownload
                                src={getFileLink(item.imagePath)}
                                alt="Оброблена передня"
                              />
                            )}
                          </div>
                        </div>

                        {/* Задня частина */}
                        <div className="flex flex-col gap-2">
                          <p className="text-sm font-medium text-center">
                            Задня частина
                          </p>
                          {item.backSideType === 'custom' && (
                            <div className="flex gap-2">
                              {item.backOriginImagePath && (
                                <ImageWithDownload
                                  src={getFileLink(item.backOriginImagePath)}
                                  alt="Оригінал задньої"
                                />
                              )}
                              {item.backImagePath && (
                                <ImageWithDownload
                                  src={getFileLink(item.backImagePath)}
                                  alt="Оброблена задня"
                                />
                              )}
                            </div>
                          )}

                          {item.backSideType === 'template' && (
                            <div className="flex flex-col items-center">
                              {backTemplate?.imagePath && (
                                <img
                                  src={getFileLink(backTemplate.imagePath)}
                                  alt={backTemplate.title}
                                  className="w-24 h-24 object-cover rounded-md shadow"
                                />
                              )}
                              <p className="text-xs text-muted-foreground mt-1">
                                {backTemplate?.title ||
                                  'Шаблон за замовчуванням'}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Характеристики */}
                      {Object.keys(item.characteristics).length > 0 && (
                        <div className="text-sm">
                          <p className="font-medium mb-1">Характеристики:</p>
                          <div className="grid grid-cols-2 gap-2">
                            {Object.entries(item.characteristics).map(
                              ([key, value]) => (
                                <div
                                  key={key}
                                  className="text-muted-foreground"
                                >
                                  <span className="font-medium">{key}:</span>{' '}
                                  {value}
                                </div>
                              ),
                            )}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
