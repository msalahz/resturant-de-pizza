export interface IProduct {
  id: string
  type: string
  description: string
  price: number
  image: string
}

export interface IOrderItem {
  id: string
  amount: number
  product: IProduct
}

export interface IOrder {
  id: string
  userId: string
  items: IOrderItem[]
  placementTimestamp: number | null
}

export interface IUser {
  id: string
}
