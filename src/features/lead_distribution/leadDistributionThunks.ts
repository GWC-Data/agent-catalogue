import { createAsyncThunk } from "@reduxjs/toolkit"
import { fetchLeadsAPI, fetchRepsAPI } from "@/services/leadDistributionApi"

export const fetchLeadDistributionInitialData = createAsyncThunk(
  "leadDistribution/fetchInitialData",
  async (_, thunkAPI) => {
    try {
      const [leadsRes, repsRes] = await Promise.all([
        fetchLeadsAPI(),
        fetchRepsAPI(),
      ])

      return {
        leads: leadsRes,
        reps: repsRes,
      }
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message)
    }
  }
)
