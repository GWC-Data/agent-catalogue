import { createAsyncThunk } from "@reduxjs/toolkit"
import {
  fetchProductsAPI,
  fetchVendorPricesAPI,
} from "@/services/retailOptimizationApi"
import { formatVendorPricing } from "./utils/formatVendorPricing"

export const fetchRetailOptimizationInitialData = createAsyncThunk(
  "retailOptimization/fetchInitialData",
  async (_, thunkAPI) => {
    try {
      const [productData, vendorData] = await Promise.all([
        fetchProductsAPI(),
        fetchVendorPricesAPI(),
      ])

      return {
        products: productData,
        vendorPrices: formatVendorPricing(vendorData.vendor_pricing),
      }
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message)
    }
  }
)
