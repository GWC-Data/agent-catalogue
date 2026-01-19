import { createAsyncThunk } from "@reduxjs/toolkit"
import { runInventoryDisposalAPI } from "@/services/inventoryDisposalApi"
import { generateThreadId } from "@/utils/generateThreadId"

export const fetchInventoryDisposalAgentOutput = createAsyncThunk(
  "inventoryDisposal/fetchAgentOutput",
  async (_, thunkAPI) => {
    try {
      const threadId = generateThreadId()

      const response = await runInventoryDisposalAPI(threadId)

      return {
        disposalResults: response?.results,
      }
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message)
    }
  }
)
