import { createAsyncThunk } from "@reduxjs/toolkit"
import { fetchAgentOutputAPI } from "@/services/retailPromotionApi"

export const fetchRetailPromotionAgentOutput = createAsyncThunk(
  "retailPromotion/fetchAgentOutput",
  async (_, thunkAPI) => {
    try {
      const response = await fetchAgentOutputAPI()

      return response.result
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message)
    }
  }
)
