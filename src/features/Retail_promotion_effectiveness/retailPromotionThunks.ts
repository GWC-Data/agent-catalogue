import { fetchHistoricalPromotionsAPI, fetchLivePromotionsAPI } from '@/services/retailPromotionApi'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const retailPromotionThunks = createAsyncThunk(
    "RetailPromotion/fetchRetailPromotionData",
    async (_, thunkAPI) => {
      try {
        const [historicalRes, liveRes] = await Promise.all([
            fetchHistoricalPromotionsAPI(),
            fetchLivePromotionsAPI()
        ])
        return { historicalPromotions: historicalRes.data, 
          livePromotions: liveRes.data,   }
      } catch (error: any) {
        return thunkAPI.rejectWithValue(error.message)
      }
    }
  )
  
