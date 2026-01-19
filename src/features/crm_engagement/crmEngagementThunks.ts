import { createAsyncThunk } from "@reduxjs/toolkit"
import { fetchCrmCampaignsAPI } from "@/services/crmEngagementApi"

export const fetchCrmEngagementInitialData = createAsyncThunk(
  "crmEngagement/fetchInitialData",
  async (_, thunkAPI) => {
    try {
      const response = await fetchCrmCampaignsAPI()

      return {
        campaigns: response?.campaign_data,
      }
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message)
    }
  }
)
