import { Download, Eye } from 'lucide-react'
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
  return (
    <Dialog>
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
              <p className="text-sm text-muted-foreground">Телефон</p>
              <p className="font-medium">{order.phone}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Статус</p>
              <StatusBadge status={order.status} />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Дата створення</p>
              <p className="font-medium">
                {new Date(order.createdAt).toLocaleString('uk-UA')}
              </p>
            </div>
          </div>

          <Separator />

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
                  <p className="text-sm text-muted-foreground">
                    Загальна кількість
                  </p>
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
                    {formatPrice(order.discount)}{' '}
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
              {order.items.map((item, index) => (
                <Card key={item.id}>
                  <CardContent className="pt-6">
                    <div className="flex gap-4">
                      <div className="flex gap-2">
                        {item.originImagePath && (
                          <ImageWithDownload
                            src={getFileLink(item.originImagePath)}
                            alt="Оригінал"
                          />
                        )}
                        {item.imagePath && (
                          <ImageWithDownload
                            src={getFileLink(item.imagePath)}
                            alt="Обробка"
                          />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium mb-2">Позиція #{index + 1}</p>
                        <p className="text-sm text-muted-foreground mb-2">
                          Кількість: {item.quantity} шт
                        </p>
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
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
