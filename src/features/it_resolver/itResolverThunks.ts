import { createAsyncThunk } from "@reduxjs/toolkit"
import {
  fetchResolversAPI,
  fetchTicketsAPI,
} from "@/services/itResolverApi"

export const fetchITResolverInitialData = createAsyncThunk(
  "itResolver/fetchInitialData",
  async (_, thunkAPI) => {
    try {
      const [resolversRes, ticketsRes] = await Promise.all([
        fetchResolversAPI(),
        fetchTicketsAPI(),
      ])

      return {
        resolvers: resolversRes,
        tickets: ticketsRes,
      }
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message)
    }
  }
)
