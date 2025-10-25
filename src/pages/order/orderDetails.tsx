import { motion } from 'framer-motion'
import { ArrowLeft, CheckCircle, Package, Phone, User } from 'lucide-react'
import { useNavigate, useParams } from '@tanstack/react-router'
import { useState } from 'react'
import type { OrderItem } from '@/modules/orders/types'
import { StatusBadge, useOrder } from '@/modules/orders'
import { Button } from '@/shared/components/ui/button'
import { Card } from '@/shared/components/ui/card'
import { Separator } from '@/shared/components/ui/separator'
import { Badge } from '@/shared/components/ui/badge'
import { Skeleton } from '@/shared/components/ui/skeleton'
import { getFileLink } from '@/shared/api/utils.tsx'
import { formatPrice } from '@/shared/lib/utils.ts'
import { useBackTemplate } from '@/modules/back-templates'

interface FlipImageProps {
  front: string
  back: string
  size?: number // px, default 240 (w-60)
}

export const FlipImage: React.FC<FlipImageProps> = ({
  front,
  back,
  size = 240,
}) => {
  const [flipped, setFlipped] = useState(false)

  const frontSrc = getFileLink(front)
  const backSrc = getFileLink(back)

  const containerStyle: React.CSSProperties = {
    width: size,
    height: size,
    perspective: 1000,
  }

  const innerStyle: React.CSSProperties = {
    width: '100%',
    height: '100%',
    position: 'relative',
    transformStyle: 'preserve-3d',
    transition: 'transform 0.6s',
    transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
    cursor: 'pointer',
  }

  const faceStyle: React.CSSProperties = {
    position: 'absolute',
    inset: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: '9999px',
    backfaceVisibility: 'hidden' as const,
    WebkitBackfaceVisibility: 'hidden' as const,
    border: '2px solid blue',
  }

  const backFaceStyle: React.CSSProperties = {
    ...faceStyle,
    transform: 'rotateY(180deg)',
  }

  return (
    <div
      style={containerStyle}
      // hover only (desktop): flip on mouse enter; also allow click to toggle for mobile
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      onClick={() => setFlipped((s) => !s)}
      aria-pressed={flipped}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') setFlipped((s) => !s)
      }}
    >
      <div style={innerStyle}>
        <img src={frontSrc} alt="Front" style={faceStyle} />
        <img src={backSrc} alt="Back" style={backFaceStyle} />
      </div>
    </div>
  )
}

export const OrderDetailsItem = ({
  item,
  index,
}: {
  item: OrderItem
  index: number
}) => {
  const { data } = useBackTemplate(item.backTemplateId as string, {
    enabled: item.backSideType === 'template' && !!item.backTemplateId,
  })
  return (
    <div key={item.id} className="border rounded-lg p-4 space-y-3">
      <div className="flex justify-between items-start">
        <h3 className="font-semibold">Produit #{index + 1}</h3>
        <Badge variant="secondary">Quantité : {item.quantity}</Badge>
      </div>
      <div className="flex justify-between items-start gap-4">
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">
            Caractéristiques :
          </p>
          <div className="flex flex-wrap gap-2">
            {Object.entries(item.characteristics).map(([key, value]) => (
              <p>
                {key}: {value}
              </p>
            ))}
          </div>
        </div>
        <FlipImage
          front={item.imagePath ? item.imagePath : item.originImagePath}
          back={
            data
              ? data.imagePath
              : item.backImagePath
                ? item.backImagePath
                : item.backOriginImagePath
          }
        />
      </div>
    </div>
  )
}

export const OrderDetailPage = () => {
  const { orderId } = useParams({ from: '/order/$orderId' })
  const navigate = useNavigate()
  const { data: order, isLoading } = useOrder(orderId)
  if (isLoading) {
    return (
      <div className="container mx-auto py-10 space-y-6">
        <Skeleton className="h-12 w-64" />
        <Skeleton className="h-96 w-full" />
      </div>
    )
  }

  if (!order) {
    return (
      <div className="container mx-auto py-10">
        <Card className="p-6 text-center">
          <p className="text-muted-foreground">Замовлення не знайдено</p>
        </Card>
      </div>
    )
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }
  return (
    <motion.div
      className="container mx-auto py-10 space-y-6"
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
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Commande #{order.id}
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Créée le {formatDate(order.createdAt)}
            </p>
          </div>
        </div>
        <StatusBadge status={order.status} />
      </header>

      <Separator />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT: Order Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Customer Info */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <User className="h-5 w-5" />
              Informations sur le client
            </h2>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <User className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Nom</p>
                  <p className="font-medium">{order.name}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">E-mail</p>
                  <p className="font-medium">{order.email}</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Order Items */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Package className="h-5 w-5" />
              Produits
            </h2>
            <div className="space-y-4">
              {order.items.map((item, index) => (
                <OrderDetailsItem item={item} key={index} index={index} />
              ))}
            </div>
          </Card>
        </div>

        {/* RIGHT: Price Summary */}
        <div className="space-y-6">
          <Card className="p-6 sticky top-24">
            <h2 className="text-xl font-semibold mb-4">Résumé</h2>

            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Prix unitaire</span>
                <span className="font-medium">
                  {formatPrice(order.pricePerUnit)}
                </span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Quantité</span>
                <span className="font-medium">{order.totalQuantity} pcs</span>
              </div>

              <Separator />

              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Montant</span>
                <span className="font-medium">
                  {formatPrice(order.totalPrice)}
                </span>
              </div>

              {order.discount > 0 && (
                <div className="flex justify-between text-sm text-green-600">
                  <span>Remise</span>
                  <span className="font-medium">
                    -{formatPrice(order.discount)}
                  </span>
                </div>
              )}

              <Separator />

              <div className="flex justify-between text-lg font-bold">
                <span>À payer</span>
                <span className="text-primary">
                  {formatPrice(order.totalPriceWithDiscount)}
                </span>
              </div>
            </div>

            <div className="mt-6 p-4 bg-muted rounded-lg">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium">Commande acceptée</p>
                  <p className="text-muted-foreground mt-1">
                    Nous vous contacterons sous peu
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </motion.div>
  )
}
