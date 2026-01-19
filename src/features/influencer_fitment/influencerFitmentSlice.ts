import { createSlice } from "@reduxjs/toolkit"
import { fetchInfluencerFitmentInitialData } from "./influencerFitmentThunks"
import { runInfluencerFitmentWorkflow } from "./influencerFitmentAgentThunks"

type InfluencerFitmentState = {
  /* ---------- Index Page ---------- */
  influencers: any[]
  campaigns: any[]
  loading: boolean
  error: string | null
  isFetched: boolean

  /* ---------- Agent Output ---------- */
  aiScoring: any[]
  fitmentScores: any[]
  campaignReport: any[]
  agentMessage: string | null
  agentLoading: boolean
  agentError: string | null
}

const initialState: InfluencerFitmentState = {
  influencers: [],
  campaigns: [],
  loading: false,
  error: null,
  isFetched: false,

  aiScoring: [],
  fitmentScores: [],
  campaignReport: [],
  agentMessage: null,
  agentLoading: false,
  agentError: null,
}

const influencerFitmentSlice = createSlice({
  name: "influencerFitment",
  initialState,
  reducers: {
    resetInfluencerFitmentState: (state) => {
      state.influencers = []
      state.campaigns = []
      state.loading = false
      state.error = null
      state.isFetched = false
    },
    resetAgentOutput: (state) => {
      state.aiScoring = []
      state.fitmentScores = []
      state.campaignReport = []
      state.agentMessage = null
      state.agentLoading = false
      state.agentError = null
    },
  },
  extraReducers: (builder) => {
    builder
      /* ================= INITIAL DATA ================= */
      .addCase(fetchInfluencerFitmentInitialData.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchInfluencerFitmentInitialData.fulfilled, (state, action) => {
        state.loading = false
        state.influencers = action.payload.influencers
        state.campaigns = action.payload.campaigns
        state.isFetched = true
      })
      .addCase(fetchInfluencerFitmentInitialData.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })

      /* ================= AGENT WORKFLOW ================= */
      .addCase(runInfluencerFitmentWorkflow.pending, (state) => {
        state.agentLoading = true
        state.agentError = null
      })
      .addCase(runInfluencerFitmentWorkflow.fulfilled, (state, action) => {
        state.agentLoading = false
        state.agentMessage = action.payload.message
        state.aiScoring = action.payload.aiScoring
        state.fitmentScores = action.payload.fitmentScores
        state.campaignReport = action.payload.campaignReport
      })
      .addCase(runInfluencerFitmentWorkflow.rejected, (state, action) => {
        state.agentLoading = false
        state.agentError = action.payload as string
      })
  },
})

export const {
  resetInfluencerFitmentState,
  resetAgentOutput,
} = influencerFitmentSlice.actions

export default influencerFitmentSlice.reducer
