import { createSlice } from "@reduxjs/toolkit"
import { fetchManufacturingData } from "./manufacturingThunks"

type ManufacturingState = {
  historicalSales: any[]
  vendorMaster: any[]
  loading: boolean
  error: string | null
  isFetched: boolean
}

const initialState: ManufacturingState = {
  historicalSales: [],
  vendorMaster: [],
  loading: false,
  error: null,
  isFetched: false
}

const manufacturingSlice = createSlice({
  name: "manufacturing",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchManufacturingData.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchManufacturingData.fulfilled, (state, action) => {
        state.loading = false
        state.historicalSales = action.payload.historicalSales
        state.vendorMaster = action.payload.formattedVendorMaster
        state.isFetched = true
      })
      .addCase(fetchManufacturingData.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  }
})

export default manufacturingSlice.reducer
