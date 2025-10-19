export type Category = {
  id: string
  title: string
  iconUrl?: string
  createdAt: string
  updatedAt: string
  options: Array<Option>
}

export type Option = {
  id: string
  title: string
  metadata?: {
    colorHex: string
  }
  smallImageUrl?: string
  largeImageUrl?: string
  categoryId: string
  createdAt: string
  updatedAt: string
}
