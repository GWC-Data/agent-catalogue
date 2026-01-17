import { createSlice } from "@reduxjs/toolkit"
import { fetchReturnFraudInitialData } from "./returnsFraudThunks"
import { fetchReturnFraudAgentOutput } from "./returnFraudAgentThunks"

type ReturnFraudState = {
  /* ---------- Index Page Data ---------- */
  customers: any[]
  products: any[]
  policies: any[]
  loading: boolean
  error: string | null
  isFetched: boolean

  /* ---------- Agent Output ---------- */
  highRiskCustomers: any[]
  highRiskProducts: any[]
  agentLoading: boolean
  agentError: string | null
}

const initialState: ReturnFraudState = {
  customers: [],
  products: [],
  policies: [],
  loading: false,
  error: null,
  isFetched: false,

  highRiskCustomers: [],
  highRiskProducts: [],
  agentLoading: false,
  agentError: null,
}

const returnFraudSlice = createSlice({
  name: "returnFraud",
  initialState,
  reducers: {
    resetReturnFraudState: (state) => {
      state.customers = []
      state.products = []
      state.policies = []
      state.loading = false
      state.error = null
      state.isFetched = false
    },
    resetAgentOutput: (state) => {
      state.highRiskCustomers = []
      state.highRiskProducts = []
      state.agentLoading = false
      state.agentError = null
    },
  },
  extraReducers: (builder) => {
    builder
      /* ================= INITIAL DATA ================= */
      .addCase(fetchReturnFraudInitialData.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchReturnFraudInitialData.fulfilled, (state, action) => {
        state.loading = false
        state.customers = action.payload.customers
        state.products = action.payload.products
        state.policies = action.payload.policies
        state.isFetched = true
      })
      .addCase(fetchReturnFraudInitialData.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })

      /* ================= AGENT OUTPUT ================= */
      .addCase(fetchReturnFraudAgentOutput.pending, (state) => {
        state.agentLoading = true
        state.agentError = null
      })
      .addCase(fetchReturnFraudAgentOutput.fulfilled, (state, action) => {
        state.agentLoading = false
        state.highRiskCustomers = action.payload.highRiskCustomers
        state.highRiskProducts = action.payload.highRiskProducts
      })
      .addCase(fetchReturnFraudAgentOutput.rejected, (state, action) => {
        state.agentLoading = false
        state.agentError = action.payload as string
      })
  },
})

export const {
  resetReturnFraudState,
  resetAgentOutput,
} = returnFraudSlice.actions

export default returnFraudSlice.reducer
