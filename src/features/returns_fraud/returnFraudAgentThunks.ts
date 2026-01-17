import { createAsyncThunk } from "@reduxjs/toolkit"
import { runReturnFraudAgentAPI } from "@/services/returnFraudApi"

export const fetchReturnFraudAgentOutput = createAsyncThunk(
  "returnFraud/fetchAgentOutput",
  async (_, thunkAPI) => {
    try {
      const response = await runReturnFraudAgentAPI()

      return {
        highRiskCustomers: response?.high_risk_customers,
        highRiskProducts: response?.high_risk_products,
      }
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message)
    }
  }
)
