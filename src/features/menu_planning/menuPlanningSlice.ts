import { createSlice } from "@reduxjs/toolkit"
import { fetchMenuPlanningData } from "./menuPlanningThunks"
import {
  runMenuPlanningAgent,
  approveMenuPlanningAgent,
} from "./menuPlanningAgentThunks"

type RecipesData = Record<string, Record<string, number>>

type MenuPlanningState = {
  /* ---------- Initial Data ---------- */
  dishes: any[]
  inventory: any[]
  vendor: any[]
  recipes: RecipesData
  sales: any[]

  loading: boolean
  error: string | null
  isFetched: boolean

  /* ---------- Agent Workflow ---------- */
  agentOutput: any
  threadId: string | null
  agentLoading: boolean
  agentError: string | null
  agentSales: any
  agentRecipes: any
  agentInventory: any
  agentVendors: any
  agentForecast: any
  agentIngredientRequirement: any
  agentDishScores: any
  agentVendorOrders: any
}

const initialState: MenuPlanningState = {
  dishes: [],
  inventory: [],
  vendor: [],
  recipes: {},
  sales: [],

  loading: false,
  error: null,
  isFetched: false,

  agentOutput: null,
  threadId: null,
  agentLoading: false,
  agentError: null,
  agentSales: null,
  agentRecipes: null,
  agentInventory: null,
  agentVendors: null,
  agentForecast: null,
  agentIngredientRequirement: null,
  agentDishScores: null,
  agentVendorOrders: null,
}

const menuPlanningSlice = createSlice({
  name: "menuPlanning",
  initialState,
  reducers: {
    resetMenuPlanningState: (state) => {
      state.dishes = []
      state.inventory = []
      state.vendor = []
      state.recipes = {}
      state.sales = []
      state.loading = false
      state.error = null
      state.isFetched = false
    },
    resetMenuPlanningAgentState: (state) => {
      state.agentOutput = null
      state.threadId = null
      state.agentLoading = false
      state.agentError = null
      state.agentSales = null
      state.agentRecipes = null
      state.agentInventory = null
      state.agentVendors = null
      state.agentForecast = null
      state.agentIngredientRequirement = null
      state.agentDishScores = null
      state.agentVendorOrders = null
    },
  },
  extraReducers: (builder) => {
    builder
      /* ================= INITIAL DATA ================= */
      .addCase(fetchMenuPlanningData.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchMenuPlanningData.fulfilled, (state, action) => {
        state.loading = false
        state.dishes = action.payload.dishes
        state.inventory = action.payload.inventory
        state.vendor = action.payload.vendor
        state.recipes = action.payload.recipes || {}
        state.sales = action.payload.sales
        state.isFetched = true
      })
      .addCase(fetchMenuPlanningData.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })

      /* ================= RUN AGENT ================= */
      .addCase(runMenuPlanningAgent.pending, (state) => {
        state.agentLoading = true
        state.agentError = null
      })
      .addCase(runMenuPlanningAgent.fulfilled, (state, action) => {
        state.agentLoading = false
        state.threadId = action.payload.threadId
        state.agentOutput = action.payload.agentOutput
      })
      .addCase(runMenuPlanningAgent.rejected, (state, action) => {
        state.agentLoading = false
        state.agentError = action.payload as string
      })

      /* ================= APPROVE AGENT ================= */
      .addCase(approveMenuPlanningAgent.pending, (state) => {
        state.agentLoading = true
      })
      .addCase(approveMenuPlanningAgent.fulfilled, (state, action) => {
        state.agentLoading = false
        state.agentSales = action.payload.agentSales
        state.agentRecipes = action.payload.agentRecipes
        state.agentInventory = action.payload.agentInventory
        state.agentVendors = action.payload.agentVendors
        state.agentForecast = action.payload.agentForecast
        state.agentIngredientRequirement = action.payload.agentIngredientRequirement
        state.agentDishScores = action.payload.agentDishScores
        state.agentVendorOrders = action.payload.agentVendorOrders
      })
      .addCase(approveMenuPlanningAgent.rejected, (state, action) => {
        state.agentLoading = false
        state.agentError = action.payload as string
      })
  },
})

export const {
  resetMenuPlanningState,
  resetMenuPlanningAgentState,
} = menuPlanningSlice.actions

export default menuPlanningSlice.reducer
