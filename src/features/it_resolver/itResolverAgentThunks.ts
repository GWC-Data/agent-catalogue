import { createAsyncThunk } from "@reduxjs/toolkit"
import { fetchAgentAPI } from "@/services/itResolverApi"

export const runITResolverAgent = createAsyncThunk(
  "itResolver/runAgent",
  async (_, thunkAPI) => {
    try {
      const response = await fetchAgentAPI()
      return response?.processed_tickets
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message)
    }
  }
)
