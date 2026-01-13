type VendorMaster = {
    vendor_id: string;
    vendor_score: number;
    unit_price: number;
  };

  type VendorMasterResponse = {
    sku_id: string;
    vendors: VendorMaster[];
  };
  
  export type VendorMasterRow = {
    sku_id: string;
    vendor_id: string;
    vendor_score: number;
    unit_price: number;
  };

  export function formatVendorMaster(
    data: VendorMasterResponse[]
  ): VendorMasterRow[] {
    const result: VendorMasterRow[] = [];
  
    data.forEach((item) => {
      item.vendors.forEach((vendor) => {
        result.push({
          sku_id: item.sku_id,
          vendor_id: vendor.vendor_id,
          vendor_score: vendor.vendor_score,
          unit_price: vendor.unit_price,
        });
      });
    });
  
    return result;
  }
  