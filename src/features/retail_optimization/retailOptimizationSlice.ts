import { createSlice } from "@reduxjs/toolkit"
import { fetchRetailOptimizationInitialData } from "./retailOptimizationThunks"
import {
  startRetailOptimizationWorkflow,
  fetchRetailOptimizationAgentOutput,
  approveRetailOptimizationWorkflow,
  rejectRetailOptimizationWorkflow,
} from "./retailOptimizationAgentThunks"

type RetailOptimizationState = {
  /* ---------- Initial Page Data ---------- */
  products: any[]
  vendorPrices: any[]
  loading: boolean
  error: string | null
  isFetched: boolean

  /* ---------- Agent Workflow Data ---------- */
  workflowId: number | null
  approvalData: any
  productOutput: any
  agentLoading: boolean
  agentError: string | null
  message: string | null
}

const initialState: RetailOptimizationState = {
  products: [],
  vendorPrices: [],
  loading: false,
  error: null,
  isFetched: false,

  workflowId: null,
  approvalData: null,
  productOutput: null,
  agentLoading: false,
  agentError: null,
  message: null,
}

const retailOptimizationSlice = createSlice({
  name: "retailOptimization",
  initialState,
  reducers: {
    resetAgentState: (state) => {
      state.workflowId = null
      state.approvalData = null
      state.productOutput = null
      state.agentLoading = false
      state.agentError = null
      state.message = null
    },
  },
  extraReducers: (builder) => {
    /* ================= INITIAL DATA ================= */
    builder
      .addCase(fetchRetailOptimizationInitialData.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchRetailOptimizationInitialData.fulfilled, (state, action) => {
        state.loading = false
        state.products = action.payload.products
        state.vendorPrices = action.payload.vendorPrices
        state.isFetched = true
      })
      .addCase(fetchRetailOptimizationInitialData.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })

    /* ================= AGENT: START WORKFLOW ================= */
    builder
      .addCase(startRetailOptimizationWorkflow.pending, (state) => {
        state.agentLoading = true
        state.agentError = null
      })
      .addCase(startRetailOptimizationWorkflow.fulfilled, (state, action) => {
        state.agentLoading = false
        state.workflowId = action.payload.workflowId
        state.approvalData = action.payload.approvalData

        localStorage.setItem(
            "workFlowId",
            String(action.payload.workflowId)
          )
      })
      .addCase(startRetailOptimizationWorkflow.rejected, (state, action) => {
        state.agentLoading = false
        state.agentError = action.payload as string
      })

    /* ================= AGENT: FETCH OUTPUT ================= */
    builder
      .addCase(fetchRetailOptimizationAgentOutput.pending, (state) => {
        state.agentLoading = true
      })
      .addCase(fetchRetailOptimizationAgentOutput.fulfilled, (state, action) => {
        state.agentLoading = false
        state.productOutput = action.payload.productOutput
      })
      .addCase(fetchRetailOptimizationAgentOutput.rejected, (state, action) => {
        state.agentLoading = false
        state.agentError = action.payload as string
      })

    /* ================= AGENT: APPROVE ================= */
    builder
      .addCase(approveRetailOptimizationWorkflow.pending, (state) => {
        state.agentLoading = true
      })
      .addCase(approveRetailOptimizationWorkflow.fulfilled, (state, action) => {
        state.agentLoading = false
        state.message = action.payload.message
      })
      .addCase(approveRetailOptimizationWorkflow.rejected, (state, action) => {
        state.agentLoading = false
        state.agentError = action.payload as string
      })

      /* ================= AGENT: REJECT ================= */
    builder
        .addCase(rejectRetailOptimizationWorkflow.pending, (state) => {
          state.agentLoading = true
          state.agentError = null
        })
        .addCase(rejectRetailOptimizationWorkflow.fulfilled, (state, action) => {
          state.agentLoading = false
          state.message = action.payload.message
        })
        .addCase(rejectRetailOptimizationWorkflow.rejected, (state, action) => {
          state.agentLoading = false
          state.agentError = action.payload as string
        })
    },
})

export const { resetAgentState } = retailOptimizationSlice.actions
export default retailOptimizationSlice.reducer
