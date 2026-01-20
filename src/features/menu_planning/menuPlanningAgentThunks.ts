import { createAsyncThunk } from "@reduxjs/toolkit"
import {
  menuPlanningWorkflowAgentAPI,
  ApproveAgentAPI,
} from "@/services/menuPlanning"
import { generateThreadId } from "@/utils/generateThreadId"
import { formatDailySales } from "./formatDailySales"
import { formatInventoryData } from "./formateInventoryData"
import { formatVendorOrders } from "./formatVendorOrders"

export const runMenuPlanningAgent = createAsyncThunk(
  "menuPlanning/runAgent",
  async (_, thunkAPI) => {
    try {
      const threadId = generateThreadId()
      const response = await menuPlanningWorkflowAgentAPI(threadId)

      return {
        threadId,
        agentOutput: response?.status[0]?.value
      }
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message)
    }
  }
)

export const approveMenuPlanningAgent = createAsyncThunk(
  "menuPlanning/approveAgent",
  async (
    payload: { threadId: string; message: string },
    thunkAPI
  ) => {
    try {
      const response = await ApproveAgentAPI(
        payload.threadId,
        payload.message
      )
        const formatedSales = formatDailySales(response?.sales_data);
        const formatedInventory = formatInventoryData(response.inventory)
        const vendorTableData = formatVendorOrders(response?.vendor_orders)
      return {
        agentSales: formatedSales,
        agentRecipes: response?.recipes,
        agentInventory: formatedInventory,
        agentVendors: response?.vendors,
        agentForecast: response?.forecast,
        agentIngredientRequirement: response?.ingredient_requirement,
        agentDishScores: response?.dish_scores,
        agentVendorOrders: vendorTableData
      }
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message)
    }
  }
)
