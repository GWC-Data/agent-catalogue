import { createSlice } from "@reduxjs/toolkit"
import { fetchManufacturingData } from "./manufacturingThunks"
import {
  runManufacturingAgent,
  approveManufacturingAgent,
} from "./manufacturingAgentThunks"

type ManufacturingState = {
  /* ---------- Initial APIs ---------- */
  historicalSales: any[]
  vendorMaster: any[]
  initialLoading: boolean
  initialError: string | null
  isFetched: boolean

  /* ---------- Agent APIs ---------- */
  agentData: any
  approvedAgentData: null
  threadId: string | null
  agentLoading: boolean
  agentError: string | null
}

const initialState: ManufacturingState = {
  historicalSales: [],
  vendorMaster: [],
  initialLoading: false,
  initialError: null,
  isFetched: false,

  agentData: null,
  approvedAgentData: null,
  threadId: null,
  agentLoading: false,
  agentError: null,
}

const manufacturingSlice = createSlice({
  name: "manufacturing",
  initialState,
  reducers: {
    resetAgentState: (state) => {
      state.agentData = null
      state.threadId = null
      state.agentLoading = false
      state.agentError = null
    },
  },
  extraReducers: (builder) => {
    /* ================= INITIAL DATA ================= */
    builder
      .addCase(fetchManufacturingData.pending, (state) => {
        state.initialLoading = true
        state.initialError = null
      })
      .addCase(fetchManufacturingData.fulfilled, (state, action) => {
        state.initialLoading = false
        state.historicalSales = action.payload.historicalSales
        state.vendorMaster = action.payload.formattedVendorMaster
        state.isFetched = true
      })
      .addCase(fetchManufacturingData.rejected, (state, action) => {
        state.initialLoading = false
        state.initialError = action.payload as string
      })

    /* ================= RUN AGENT ================= */
    builder
      .addCase(runManufacturingAgent.pending, (state) => {
        state.agentLoading = true
        state.agentError = null
      })
      .addCase(runManufacturingAgent.fulfilled, (state, action) => {
        state.agentLoading = false
        state.threadId = action.payload.threadId
        state.agentData = action.payload.agentData
      })
      .addCase(runManufacturingAgent.rejected, (state, action) => {
        state.agentLoading = false
        state.agentError = action.payload as string
      })

    /* ================= APPROVE AGENT ================= */
    builder
      .addCase(approveManufacturingAgent.pending, (state) => {
        state.agentLoading = true
      })
      .addCase(approveManufacturingAgent.fulfilled, (state, action) => {
        state.approvedAgentData = action.payload.approvData
        state.agentLoading = false
      })
      .addCase(approveManufacturingAgent.rejected, (state, action) => {
        state.agentLoading = false
        state.agentError = action.payload as string
      })
  },
})

export const { resetAgentState } = manufacturingSlice.actions
export default manufacturingSlice.reducer
