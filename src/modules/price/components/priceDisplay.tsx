import { clsx } from 'clsx'
import type { FC } from 'react'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/shared/components/ui/tooltip' // припустимо у вас є компонент Tooltip
import { useDiscounts } from '@/modules/discounts'

type Price = {
  basePrice: number
  discount: number
  discountPercent: number
  quantity: string
  totalPrice: number
  totalPriceWithDiscount: number
}

interface PriceDisplayProps {
  price: Price
}

export const PriceDisplay: FC<PriceDisplayProps> = ({ price }) => {
  const discounts = useDiscounts() // повертає Discount[]

  const hasDiscount = price.discount > 0

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-2">
        <span
          className={clsx('text-lg font-bold', {
            'text-gray-500 line-through': hasDiscount,
            'text-foreground': !hasDiscount,
          })}
        >
          {price.totalPrice.toFixed(2)} €
        </span>

        {hasDiscount && (
          <Tooltip>
            <TooltipTrigger>
              <span className="text-lg font-bold text-green-600">
                {price.totalPriceWithDiscount.toFixed(2)} €
              </span>
            </TooltipTrigger>
            <TooltipContent>
              <div className="flex flex-col gap-1">
                <span>Réduction : {price.discount.toFixed(2)} €</span>
                <span>
                  Pourcentage de réduction : {price.discountPercent.toFixed(0)}%
                </span>
                {discounts.data?.length ? (
                  <div>
                    <span className="font-semibold">
                      Réductions supplémentaires :
                    </span>
                    <ul className="list-disc list-inside text-sm">
                      {discounts.data.map((d) => (
                        <li key={d.id}>
                          {d.count} pcs → {d.discount} €
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </div>
            </TooltipContent>
          </Tooltip>
        )}
      </div>

      {hasDiscount && (
        <span className="text-sm text-green-600">
          Vous avez économisé {price.discount.toFixed(2)} €
        </span>
      )}
    </div>
  )
}
