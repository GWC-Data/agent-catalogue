import { createAsyncThunk } from "@reduxjs/toolkit"
import {
  fetchInfluencersAPI,
  fetchCampaignsAPI,
} from "@/services/influencerFitmentApi"

export const fetchInfluencerFitmentInitialData = createAsyncThunk(
  "influencerFitment/fetchInitialData",
  async (_, thunkAPI) => {
    try {
      const [influencersRes, campaignsRes] = await Promise.all([
        fetchInfluencersAPI(),
        fetchCampaignsAPI(),
      ])

      return {
        influencers: influencersRes?.data,
        campaigns: campaignsRes?.data,
      }
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message)
    }
  }
)
