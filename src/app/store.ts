import { configureStore } from "@reduxjs/toolkit"
import manufacturingReducer from "../features/manufacturing_optimization/manufacturingSlice"

export const store = configureStore({
  reducer: {
    manufacturing: manufacturingReducer
  }
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch