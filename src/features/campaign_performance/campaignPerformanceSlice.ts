import { createSlice } from "@reduxjs/toolkit"
import { fetchCampaignPerformanceInitialData } from "./campaignPerformanceThunks"
import { fetchCampaignPerformanceAgentOutput } from "./campaignPerformanceAgentThunks"

type CampaignPerformanceState = {
  /* ---------- Index Page ---------- */
  campaigns: any[]
  loading: boolean
  error: string | null
  isFetched: boolean

  /* ---------- Agent Output ---------- */
  topTen: any[]
  bottomTen: any[]
  agentLoading: boolean
  agentError: string | null
}

const initialState: CampaignPerformanceState = {
  campaigns: [],
  loading: false,
  error: null,
  isFetched: false,

  topTen: [],
  bottomTen: [],
  agentLoading: false,
  agentError: null,
}

const campaignPerformanceSlice = createSlice({
  name: "campaignPerformance",
  initialState,
  reducers: {
    resetCampaignPerformanceState: (state) => {
      state.campaigns = []
      state.loading = false
      state.error = null
      state.isFetched = false
    },
    resetAgentOutput: (state) => {
      state.topTen = []
      state.bottomTen = []
      state.agentLoading = false
      state.agentError = null
    },
  },
  extraReducers: (builder) => {
    builder
      /* ================= INITIAL DATA ================= */
      .addCase(fetchCampaignPerformanceInitialData.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchCampaignPerformanceInitialData.fulfilled, (state, action) => {
        state.loading = false
        state.campaigns = action.payload.campaigns
        state.isFetched = true
      })
      .addCase(fetchCampaignPerformanceInitialData.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })

      /* ================= AGENT OUTPUT ================= */
      .addCase(fetchCampaignPerformanceAgentOutput.pending, (state) => {
        state.agentLoading = true
        state.agentError = null
      })
      .addCase(fetchCampaignPerformanceAgentOutput.fulfilled, (state, action) => {
        state.agentLoading = false
        state.topTen = action.payload.topTen
        state.bottomTen = action.payload.bottomTen
      })
      .addCase(fetchCampaignPerformanceAgentOutput.rejected, (state, action) => {
        state.agentLoading = false
        state.agentError = action.payload as string
      })
  },
})

export const {
  resetCampaignPerformanceState,
  resetAgentOutput,
} = campaignPerformanceSlice.actions

export default campaignPerformanceSlice.reducer
