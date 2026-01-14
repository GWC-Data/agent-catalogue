import { createSlice } from "@reduxjs/toolkit"
import { retailPromotionThunks } from "./retailPromotionThunks"
import { fetchRetailPromotionAgentOutput } from "./retailPromotionAgentThunks"

type RetailPromotionState = {
  historicalPromotions: any[]
  livePromotions: any[]
  loading: boolean
  error: string | null
  isFetched: boolean

  /* ---------- Agent API ---------- */
  agentOutput: any
  agentLoading: boolean
  agentError: string | null
}

const initialState: RetailPromotionState = {
  historicalPromotions: [],
  livePromotions: [],
  loading: false,
  error: null,
  isFetched: false,

  agentOutput: null,
  agentLoading: false,
  agentError: null,
}

const retailPromotionSlice = createSlice({
  name: "retailPromotion",
  initialState,
  reducers: {
    resetRetailPromotionState: (state) => {
      state.historicalPromotions = []
      state.livePromotions = []
      state.loading = false
      state.error = null
      state.isFetched = false
    },
    resetAgentOutput: (state) => {
      state.agentOutput = null
      state.agentLoading = false
      state.agentError = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(retailPromotionThunks.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(retailPromotionThunks.fulfilled, (state, action) => {
        state.loading = false
        state.historicalPromotions = action.payload.historicalPromotions
        state.livePromotions = action.payload.livePromotions
        state.isFetched = true
      })
      .addCase(retailPromotionThunks.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })

       /* ================= AGENT OUTPUT ================= */
    builder
    .addCase(fetchRetailPromotionAgentOutput.pending, (state) => {
      state.agentLoading = true
      state.agentError = null
    })
    .addCase(fetchRetailPromotionAgentOutput.fulfilled, (state, action) => {
      state.agentLoading = false
      state.agentOutput = action.payload
    })
    .addCase(fetchRetailPromotionAgentOutput.rejected, (state, action) => {
      state.agentLoading = false
      state.agentError = action.payload as string
    })
  },
})

export const { resetRetailPromotionState, resetAgentOutput } = retailPromotionSlice.actions
export default retailPromotionSlice.reducer
