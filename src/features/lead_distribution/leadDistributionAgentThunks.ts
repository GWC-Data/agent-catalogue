import { createAsyncThunk } from "@reduxjs/toolkit"
import {
  runLeadDistributionAgentAPI,
  resetLeadDistributionAPI,
} from "@/services/leadDistributionApi"

export const runLeadDistributionAgent = createAsyncThunk(
  "leadDistribution/runAgent",
  async (_, thunkAPI) => {
    try {
      const response = await runLeadDistributionAgentAPI()
      return {
        leadsOutput: response?.leads,
      }
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message)
    }
  }
)

export const resetLeadDistributionAgent = createAsyncThunk(
  "leadDistribution/resetAgent",
  async (_, thunkAPI) => {
    try {
      const response = await resetLeadDistributionAPI()
      return {
        message: response?.message,
      }
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message)
    }
  }
)
