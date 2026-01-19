import { createSlice } from "@reduxjs/toolkit"
import { fetchCrmEngagementInitialData } from "./crmEngagementThunks"
import { fetchCrmEngagementAgentOutput } from "./crmEngagementAgentThunks"

type CrmEngagementState = {
  /* ---------- Index Page ---------- */
  campaigns: any[]
  loading: boolean
  error: string | null
  isFetched: boolean

  /* ---------- Agent Output ---------- */
  actionsMessage: any
  recommendedChannel: any
  bestSendWindows: any[]
  structuredMarketingInsights: any
  abTestWinners: any[]
  agentLoading: boolean
  agentError: string | null
}

const initialState: CrmEngagementState = {
  campaigns: [],
  loading: false,
  error: null,
  isFetched: false,

  actionsMessage: null,
  recommendedChannel: null,
  bestSendWindows: [],
  structuredMarketingInsights: null,
  abTestWinners: [],
  agentLoading: false,
  agentError: null,
}

const crmEngagementSlice = createSlice({
  name: "crmEngagement",
  initialState,
  reducers: {
    resetCrmEngagementState: (state) => {
      state.campaigns = []
      state.loading = false
      state.error = null
      state.isFetched = false
    },
    resetAgentOutput: (state) => {
      state.actionsMessage = null
      state.recommendedChannel = null
      state.bestSendWindows = []
      state.structuredMarketingInsights = null
      state.abTestWinners = []
      state.agentLoading = false
      state.agentError = null
    },
  },
  extraReducers: (builder) => {
    builder
      /* ================= INITIAL DATA ================= */
      .addCase(fetchCrmEngagementInitialData.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchCrmEngagementInitialData.fulfilled, (state, action) => {
        state.loading = false
        state.campaigns = action.payload.campaigns
        state.isFetched = true
      })
      .addCase(fetchCrmEngagementInitialData.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })

      /* ================= AGENT OUTPUT ================= */
      .addCase(fetchCrmEngagementAgentOutput.pending, (state) => {
        state.agentLoading = true
        state.agentError = null
      })
      .addCase(fetchCrmEngagementAgentOutput.fulfilled, (state, action) => {
        state.agentLoading = false
        state.actionsMessage = action.payload.actionsMessage
        state.recommendedChannel = action.payload.recommendedChannel
        state.bestSendWindows = action.payload.bestSendWindows
        state.structuredMarketingInsights = action.payload.structuredMarketingInsights
        state.abTestWinners = action.payload.abTestWinners
      })
      .addCase(fetchCrmEngagementAgentOutput.rejected, (state, action) => {
        state.agentLoading = false
        state.agentError = action.payload as string
      })
  },
})

export const {
  resetCrmEngagementState,
  resetAgentOutput,
} = crmEngagementSlice.actions

export default crmEngagementSlice.reducer
