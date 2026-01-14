import { configureStore } from "@reduxjs/toolkit"
import manufacturingReducer from "../features/manufacturing_optimization/manufacturingSlice"
import retailPromotionReducer from "../features/Retail_promotion_effectiveness/retailPromotionSlice"

export const store = configureStore({
  reducer: {
    manufacturing: manufacturingReducer,
    retailPromotion: retailPromotionReducer
  }
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch