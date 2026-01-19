import { createAsyncThunk } from "@reduxjs/toolkit"
import { fetchCampaignsAPI } from "@/services/campaignPerformanceApi"

export const fetchCampaignPerformanceInitialData = createAsyncThunk(
  "campaignPerformance/fetchInitialData",
  async (_, thunkAPI) => {
    try {
      const response = await fetchCampaignsAPI()

      return {
        campaigns: response?.campaigns_data,
      }
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message)
    }
  }
)
