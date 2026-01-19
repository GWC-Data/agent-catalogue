import { createAsyncThunk } from "@reduxjs/toolkit"
import {
  runManufacturingAgentAPI,
  approveManufacturingAgentAPI,
} from "../../services/manufacturingApi"
import { generateThreadId } from "../../utils/generateThreadId"

export const runManufacturingAgent = createAsyncThunk(
  "manufacturing/runAgent",
  async (_, thunkAPI) => {
    try {
      const threadId = generateThreadId()
      const data = await runManufacturingAgentAPI(threadId)

      return {
        threadId,
        agentData: data[0]?.value?.pending_negotiation,
      }
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message)
    }
  }
)

export const approveManufacturingAgent = createAsyncThunk(
  "manufacturing/approveAgent",
  async (
    { threadId, comments }: { threadId: string; comments: string },
    thunkAPI
  ) => {
    try {
        const data = await approveManufacturingAgentAPI(threadId, comments)
      return {approvData: data}
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message)
    }
  }
)
