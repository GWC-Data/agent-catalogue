import { createAsyncThunk } from "@reduxjs/toolkit"
import { fetchInventoryDataAPI } from "@/services/inventoryDisposalApi"

export const fetchInventoryDisposalInitialData = createAsyncThunk(
  "inventoryDisposal/fetchInitialData",
  async (_, thunkAPI) => {
    try {
      const response = await fetchInventoryDataAPI()

      return {
        inventoryData: response?.inventory_data,
      }
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message)
    }
  }
)
