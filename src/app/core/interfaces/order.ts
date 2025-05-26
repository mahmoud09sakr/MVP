export interface OrderResponse {
    message: string
    orders: Order[]
}

export interface Order {
    shippingAddress: ShippingAddress
    _id: string
    userId: string
    cartItems: any[]
    productId: string
    paymentMethod: string
    isDelivered: boolean
    serviceType: string
    orderStatus: string
    paymentIntentId: string
    isRefunded: boolean
    orderdAt: string
    __v: number
}

export interface ShippingAddress {
    street: string
    city: string
    state: string
    postalCode: string
    country: string
}
  