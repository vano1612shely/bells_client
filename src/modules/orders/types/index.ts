export interface RelayPoint {
  id?: number
  Num: string
  LgAdr1: string
  LgAdr2?: string
  LgAdr3?: string
  LgAdr4?: string
  CP: string
  Ville: string
  Pays: string
  lat?: number
  lon?: number
  name?: string
  address?: string
  cp?: number | string
  city?: string
}

export interface Delivery {
  id: string
  type: 'home' | 'relay'
  // для home
  name?: string
  street?: string
  additional?: string
  postalCode?: string
  city?: string
  phone?: string
  // для relay
  relayPhone?: string
  relayPoint?: RelayPoint | null
}

export interface OrderItem {
  id: number
  quantity: number
  characteristics: Record<string, string>
  originImagePath: string
  imagePath: string | null
  backImagePath: string | null
  backOriginImagePath: string | null
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
  delivery: Delivery // ✅ нове поле
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
