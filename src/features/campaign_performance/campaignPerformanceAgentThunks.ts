import { createAsyncThunk } from "@reduxjs/toolkit"
import { fetchCampaignPerformanceAPI } from "@/services/campaignPerformanceApi"

export const fetchCampaignPerformanceAgentOutput = createAsyncThunk(
  "campaignPerformance/fetchAgentOutput",
  async (_, thunkAPI) => {
    try {
      const response = await fetchCampaignPerformanceAPI()
      return {
        topTen: response?.top_10,
        bottomTen: response?.bottom_10,
      }
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message)
    }
  }
)
