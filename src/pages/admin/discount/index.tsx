import { Check, Loader2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import {
  CreateDiscount,
  DeleteDiscount,
  useDiscounts,
} from '@/modules/discounts'
import { usePrice, useUpdatePrice } from '@/modules/price'
import { Input } from '@/shared/components/ui/input.tsx'
import { Button } from '@/shared/components/ui/button.tsx'

export const DiscountPage = () => {
  const [editPrice, setEditPrice] = useState<number>(0)
  const { data: price } = usePrice()
  const { handleUpdate, isPending } = useUpdatePrice()
  useEffect(() => {
    if (price) {
      setEditPrice(price.price)
    }
  }, [price])
  const { data, isLoading } = useDiscounts()
  if (isLoading)
    return (
      <div className="h-full w-full flex items-center justify-center">
        <Loader2 size={30} className="animate-spin" />
      </div>
    )
  return (
    <div className="w-full flex flex-col">
      <div className="w-full flex justify-between items-center mb-5">
        <div className="flex items-center gap-1">
          Ціна:{' '}
          <Input
            type="number"
            value={editPrice}
            onChange={(e) => setEditPrice(e.target.valueAsNumber)}
          />
          {editPrice !== price?.price && (
            <Button
              disabled={isPending}
              size="icon"
              onClick={() => handleUpdate(editPrice)}
            >
              <Check />
            </Button>
          )}
        </div>
        <CreateDiscount />
      </div>
      <div className="flex flex-col gap-3">
        <ul className="flex flex-col gap-3">
          {data?.map((item, index) => {
            return (
              <li
                key={index}
                className="p-2 border rounded-lg flex justify-between items-center"
              >
                <p>
                  Кількість товару: {item.count} - Скидка: {item.discount}%
                </p>
                <DeleteDiscount id={item.id} />
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
