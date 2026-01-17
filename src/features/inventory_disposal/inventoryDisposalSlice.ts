import { createSlice } from "@reduxjs/toolkit"
import { fetchInventoryDisposalInitialData } from "./inventoryDisposalThunks"
import { fetchInventoryDisposalAgentOutput } from "./inventoryDisposalAgentThunks"

type InventoryDisposalState = {
  /* ---------- Index Page ---------- */
  inventoryData: any[]
  loading: boolean
  error: string | null
  isFetched: boolean

  /* ---------- Agent Output ---------- */
  disposalResults: any[]
  agentLoading: boolean
  agentError: string | null
}

const initialState: InventoryDisposalState = {
  inventoryData: [],
  loading: false,
  error: null,
  isFetched: false,

  disposalResults: [],
  agentLoading: false,
  agentError: null,
}

const inventoryDisposalSlice = createSlice({
  name: "inventoryDisposal",
  initialState,
  reducers: {
    resetInventoryDisposalState: (state) => {
      state.inventoryData = []
      state.loading = false
      state.error = null
      state.isFetched = false
    },
    resetAgentOutput: (state) => {
      state.disposalResults = []
      state.agentLoading = false
      state.agentError = null
    },
  },
  extraReducers: (builder) => {
    builder
      /* ================= INITIAL DATA ================= */
      .addCase(fetchInventoryDisposalInitialData.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchInventoryDisposalInitialData.fulfilled, (state, action) => {
        state.loading = false
        state.inventoryData = action.payload.inventoryData
        state.isFetched = true
      })
      .addCase(fetchInventoryDisposalInitialData.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })

      /* ================= AGENT OUTPUT ================= */
      .addCase(fetchInventoryDisposalAgentOutput.pending, (state) => {
        state.agentLoading = true
        state.agentError = null
      })
      .addCase(fetchInventoryDisposalAgentOutput.fulfilled, (state, action) => {
        state.agentLoading = false
        state.disposalResults = action.payload.disposalResults
      })
      .addCase(fetchInventoryDisposalAgentOutput.rejected, (state, action) => {
        state.agentLoading = false
        state.agentError = action.payload as string
      })
  },
})

export const {
  resetInventoryDisposalState,
  resetAgentOutput,
} = inventoryDisposalSlice.actions

export default inventoryDisposalSlice.reducer
