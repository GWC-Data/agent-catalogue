export type Vendor = {
    ingredient: string
    vendor: string
    price: number
    delivery_days: number
    rating: number
  }
  
  type VendorOrdersResponse = {
    [ingredient: string]: {
      qty: number
      vendor: {
        ingredient: string
        vendor: string
        price: number
        delivery_days: number
        rating: number
      }
    }
  }
  
  export function formatVendorOrders(
    vendorOrders: VendorOrdersResponse
  ): Vendor[] {
    return Object.values(vendorOrders).map((order) => ({
      ingredient: order.vendor.ingredient,
      vendor: order.vendor.vendor,
      price: order.vendor.price,
      delivery_days: order.vendor.delivery_days,
      rating: order.vendor.rating,
    }))
  }
  