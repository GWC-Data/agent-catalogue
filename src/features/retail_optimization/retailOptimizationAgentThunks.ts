import { createAsyncThunk } from "@reduxjs/toolkit"
import {
  startWorkflowAPI,
  fetchWorkflowStateAPI,
  approveWorkflowAPI,
  rejectWorkflowAPI,
} from "@/services/retailOptimizationApi"

export const startRetailOptimizationWorkflow = createAsyncThunk(
  "retailOptimization/startWorkflow",
  async (
    payload: {
      availableBudget: number
      executor: string
      threadId: string
    },
    thunkAPI
  ) => {
    try {
      const response = await startWorkflowAPI({
        available_budget: payload.availableBudget,
        executor: payload.executor,
        thread_id: payload.threadId,
      })

      const rawWorkflowId =
        response?.__interrupt__?.[0]?.value?.["Workflow ID"]
      const workflowId = Number(rawWorkflowId)

      return {
        workflowId,
        approvalData: response?.__interrupt__?.[0]?.value,
      }
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message)
    }
  }
)

export const fetchRetailOptimizationAgentOutput = createAsyncThunk(
  "retailOptimization/fetchAgentOutput",
  async (workflowId: number, thunkAPI) => {
    try {
      const response = await fetchWorkflowStateAPI(workflowId)

      return {
        productOutput: response?.current_state?.demand_forecast,
      }
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message)
    }
  }
)

export const approveRetailOptimizationWorkflow = createAsyncThunk(
  "retailOptimization/approveWorkflow",
  async (
    payload: { workflowId: number; approver: string; comments: string },
    thunkAPI
  ) => {
    try {
      await approveWorkflowAPI(
        payload.workflowId,
        payload.approver,
        payload.comments
      )

      return { message: "Approved" }
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message)
    }
  }
)

export const rejectRetailOptimizationWorkflow = createAsyncThunk(
    "retailOptimization/rejectWorkflow",
    async (workflowId: number, thunkAPI) => {
      try {
        await rejectWorkflowAPI(workflowId)
        return { message: "Rejected" }
      } catch (error: any) {
        return thunkAPI.rejectWithValue(error.message)
      }
    }
  )