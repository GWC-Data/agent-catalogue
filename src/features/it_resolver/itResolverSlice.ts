import { createSlice } from "@reduxjs/toolkit"
import { fetchITResolverInitialData } from "./itResolverThunks"
import { runITResolverAgent } from "./itResolverAgentThunks"

type ITResolverState = {
  /* ---------- Initial Data ---------- */
  resolvers: any[]
  tickets: any[]
  loading: boolean
  error: string | null
  isFetched: boolean

  /* ---------- Agent ---------- */
  agentOutput: any
  agentLoading: boolean
  agentError: string | null
}

const initialState: ITResolverState = {
  resolvers: [],
  tickets: [],
  loading: false,
  error: null,
  isFetched: false,

  agentOutput: null,
  agentLoading: false,
  agentError: null,
}

const itResolverSlice = createSlice({
  name: "itResolver",
  initialState,
  reducers: {
    resetITResolverState: (state) => {
      state.resolvers = []
      state.tickets = []
      state.loading = false
      state.error = null
      state.isFetched = false
    },
    resetITResolverAgent: (state) => {
      state.agentOutput = null
      state.agentLoading = false
      state.agentError = null
    },
  },
  extraReducers: (builder) => {
    builder
      /* ================= INITIAL DATA ================= */
      .addCase(fetchITResolverInitialData.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchITResolverInitialData.fulfilled, (state, action) => {
        state.loading = false
        state.resolvers = action.payload.resolvers
        state.tickets = action.payload.tickets
        state.isFetched = true
      })
      .addCase(fetchITResolverInitialData.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })

      /* ================= AGENT ================= */
      .addCase(runITResolverAgent.pending, (state) => {
        state.agentLoading = true
        state.agentError = null
      })
      .addCase(runITResolverAgent.fulfilled, (state, action) => {
        state.agentLoading = false
        state.agentOutput = action.payload
      })
      .addCase(runITResolverAgent.rejected, (state, action) => {
        state.agentLoading = false
        state.agentError = action.payload as string
      })
  },
})

export const {
  resetITResolverState,
  resetITResolverAgent,
} = itResolverSlice.actions

export default itResolverSlice.reducer
