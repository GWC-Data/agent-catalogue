type Vendor = {
    vendor_id: string;
    vendor_name: string;
    email: string;
    reliability_score: number;
    delivery_days: number;
    base_price: number;
  };
  
  type VendorPricingResponse = {
    [productId: string]: Vendor[];
  };
  
  export type VendorPriceRow = {
    product_id: string;
    vendor_id: string;
    vendor_name: string;
    email: string;
    reliability_score: number;
    delivery_days: number;
    base_price: number;
  };
  
  export function formatVendorPricing(
    vendorPricing: VendorPricingResponse
  ): VendorPriceRow[] {
    const result: VendorPriceRow[] = [];
  
    Object.entries(vendorPricing).forEach(([product_id, vendors]) => {
      vendors.forEach((vendor) => {
        result.push({
          product_id,
          vendor_id: vendor.vendor_id,
          vendor_name: vendor.vendor_name,
          email: vendor.email,
          reliability_score: vendor.reliability_score,
          delivery_days: vendor.delivery_days,
          base_price: vendor.base_price,
        });
      });
    });
  
    return result;
  }
  