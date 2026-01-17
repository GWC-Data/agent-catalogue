import { createAsyncThunk } from "@reduxjs/toolkit"
import { runCrmEngagementAgentAPI } from "@/services/crmEngagementApi"

export const fetchCrmEngagementAgentOutput = createAsyncThunk(
  "crmEngagement/fetchAgentOutput",
  async (_, thunkAPI) => {
    try {
      const response = await runCrmEngagementAgentAPI()

      return {
        actionsMessage: response?.next_actions,
        recommendedChannel: response?.recommended_channel,
        bestSendWindows: response?.best_send_windows,
        structuredMarketingInsights: response?.structured_marketing_insights,
        abTestWinners: response?.ab_test_winners,
      }
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message)
    }
  }
)
