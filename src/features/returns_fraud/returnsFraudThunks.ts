import { createAsyncThunk } from "@reduxjs/toolkit"
import {
  fetchCustomerDataAPI,
  fetchProductDataAPI,
  fetchPoliciesAPI,
} from "@/services/returnFraudApi"

export const fetchReturnFraudInitialData = createAsyncThunk(
  "returnFraud/fetchInitialData",
  async (_, thunkAPI) => {
    try {
      const [customerRes, productRes, policyRes] = await Promise.all([
        fetchCustomerDataAPI(),
        fetchProductDataAPI(),
        fetchPoliciesAPI(),
      ])

      return {
        customers: customerRes?.customer_data?.customers,
        products: productRes?.product_data?.products,
        policies: policyRes?.policies?.policies,
      }
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message)
    }
  }
)
