import { createSlice } from "@reduxjs/toolkit"
import { fetchLeadDistributionInitialData } from "./leadDistributionThunks"
import {
  runLeadDistributionAgent,
  resetLeadDistributionAgent,
} from "./leadDistributionAgentThunks"

type LeadDistributionState = {
  /* ---------- Index Page ---------- */
  leads: any[]
  reps: any[]
  loading: boolean
  error: string | null
  isFetched: boolean

  /* ---------- Agent ---------- */
  leadsOutput: any[]
  agentLoading: boolean
  agentError: string | null
  resetMessage: string | null
}

const initialState: LeadDistributionState = {
  leads: [],
  reps: [],
  loading: false,
  error: null,
  isFetched: false,

  leadsOutput: [],
  agentLoading: false,
  agentError: null,
  resetMessage: null,
}

const leadDistributionSlice = createSlice({
  name: "leadDistribution",
  initialState,
  reducers: {
    clearAgentOutput: (state) => {
      state.leadsOutput = []
      state.agentError = null
      state.resetMessage = null
    },
  },
  extraReducers: (builder) => {
    builder
      /* ================= INITIAL DATA ================= */
      .addCase(fetchLeadDistributionInitialData.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchLeadDistributionInitialData.fulfilled, (state, action) => {
        state.loading = false
        state.leads = action.payload.leads
        state.reps = action.payload.reps
        state.isFetched = true
      })
      .addCase(fetchLeadDistributionInitialData.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })

      /* ================= RUN AGENT ================= */
      .addCase(runLeadDistributionAgent.pending, (state) => {
        state.agentLoading = true
        state.agentError = null
      })
      .addCase(runLeadDistributionAgent.fulfilled, (state, action) => {
        state.agentLoading = false
        state.leadsOutput = action.payload.leadsOutput
      })
      .addCase(runLeadDistributionAgent.rejected, (state, action) => {
        state.agentLoading = false
        state.agentError = action.payload as string
      })

      /* ================= RESET AGENT ================= */
      .addCase(resetLeadDistributionAgent.pending, (state) => {
        state.agentLoading = true
      })
      .addCase(resetLeadDistributionAgent.fulfilled, (state, action) => {
        state.agentLoading = false
        state.resetMessage = action.payload.message
      })
      .addCase(resetLeadDistributionAgent.rejected, (state, action) => {
        state.agentLoading = false
        state.agentError = action.payload as string
      })
  },
})

export const { clearAgentOutput } = leadDistributionSlice.actions
export default leadDistributionSlice.reducer
