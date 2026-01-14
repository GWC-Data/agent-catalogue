import { createAsyncThunk } from "@reduxjs/toolkit"
import { fetchHistoricalSalesAPI, fetchVendorMasterAPI } from "../../services/manufacturingApi"
import { formatVendorMaster } from "./formatVendorMaster"

export const fetchManufacturingData = createAsyncThunk(
  "manufacturing/fetchManufacturingData",
  async (_, thunkAPI) => {
    try {
      const [historicalSales, vendorMaster] = await Promise.all([
        fetchHistoricalSalesAPI(),
        fetchVendorMasterAPI()
      ])
      // ✅ FORMAT vendor master data HERE
      const formattedVendorMaster = formatVendorMaster(vendorMaster);

      return { historicalSales, formattedVendorMaster }
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message)
    }
  }
)
