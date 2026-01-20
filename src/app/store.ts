import { configureStore } from "@reduxjs/toolkit"
import manufacturingReducer from "../features/manufacturing_optimization/manufacturingSlice"
import retailPromotionReducer from "../features/Retail_promotion_effectiveness/retailPromotionSlice"
import returnsFraudReducer from "../features/returns_fraud/returnFraudSlice"
import campaignPerformanceReducer from "../features/campaign_performance/campaignPerformanceSlice"
import crmEngagementReducer from "../features/crm_engagement/crmEngagementSlice"
import influencerFitmentReducer from "../features/influencer_fitment/influencerFitmentSlice"
import inventoryDisposalReducer from "../features/inventory_disposal/inventoryDisposalSlice"
import leadDistributionReducer from "../features/lead_distribution/leadDistributionSlice"
import retailOptimizationReducer from "../features/retail_optimization/retailOptimizationSlice"
import menuPlanningReducer from "../features/menu_planning/menuPlanningSlice"


export const store = configureStore({
  reducer: {
    manufacturing: manufacturingReducer,
    retailPromotion: retailPromotionReducer,
    returnFraud: returnsFraudReducer,
    campaignPerformance: campaignPerformanceReducer,
    crmEngagement: crmEngagementReducer,
    influencerFitment: influencerFitmentReducer,
    inventoryDisposal: inventoryDisposalReducer,
    leadDistribution: leadDistributionReducer,
    retailOptimization: retailOptimizationReducer,
    menuPlanning: menuPlanningReducer
  }
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch