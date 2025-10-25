export interface OrderItem {
  id: number
  quantity: number
  characteristics: Record<string, string>
  originImagePath: string
  imagePath: string | null
  backImagePath: string
  backOriginImagePath: string
  backSideType: 'template' | 'custom'
  backTemplateId: string | null
}

export interface Order {
  id: string
  name: string
  email: string
  status: OrderStatus
  pricePerUnit: number
  totalPrice: number
  discount: number
  totalPriceWithDiscount: number
  totalQuantity: number
  items: Array<OrderItem>
  createdAt: string
  updatedAt: string
}

export enum OrderStatus {
  CREATED = 'CREATED',
  PAID = 'PAID',
  PROCESSING = 'PROCESSING',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

export const statusLabels = {
  CREATED: 'Створено',
  PAID: 'Оплачено',
  PROCESSING: 'В роботі',
  SHIPPED: 'Відправленно',
  DELIVERED: 'Доставленно',
  COMPLETED: 'Завершено',
  CANCELLED: 'Скасовано',
}
export const statusLabelsFr = {
  CREATED: 'Créé',
  PAID: 'Payé',
  PROCESSING: 'En cours',
  SHIPPED: 'Expédié',
  DELIVERED: 'Livré',
  COMPLETED: 'Terminé',
  CANCELLED: 'Annulé',
}

export const statusColors = {
  CREATED: 'bg-blue-100 text-blue-800',
  PAID: 'bg-blue-100 text-blue-800',
  PROCESSING: 'bg-yellow-100 text-yellow-800',
  SHIPPED: 'bg-yellow-100 text-yellow-800',
  DELIVERED: 'bg-green-100 text-green-800',
  COMPLETED: 'bg-green-100 text-green-800',
  CANCELLED: 'bg-red-100 text-red-800',
}
