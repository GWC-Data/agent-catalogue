import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ReturnsFraudPrevention from "./pages/agents/returns_fraud_prevention";
import "./App.css";
import CampaignPerformance from "./pages/agents/campaign_performance";
import RetailOptimization from "./pages/agents/rentail_optimization"
import CrmEngagementOptimization from "./pages/agents/crm_engagement_optimization";
import InfluencerFitmentAgent from "./pages/agents/influencer_fitment_agent";
import InventoryDisposalAgent from "./pages/agents/inventory_disposal_agent";
import LeadDistributionAgent from "./pages/agents/lead_distribution_agent";
import ManufacturingProcurementOptimization from "./pages/agents/manufacturing_procurement_optimization";
import RetailPromotionEffectiveness from "./pages/agents/retail_promotion_effectiveness";
import MenuPlanningAgent from "./pages/agents/menu_planning_agent";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/returns_fraud_prevention" element={<ReturnsFraudPrevention />} />
          <Route path="/campaign_performance" element={<CampaignPerformance />} />
          <Route path="/retail_optimization" element={<RetailOptimization />} />
          <Route path="/crm_engagament_optimization" element={<CrmEngagementOptimization />} />
          <Route path="/influencer_fitment_agent" element={<InfluencerFitmentAgent />} />
          <Route path="/inventory_disposal_agent" element={<InventoryDisposalAgent />} />
          <Route path="/lead_distribution_agent" element={<LeadDistributionAgent />} />
          <Route path="/manufacturing_procurement_optimization" element={<ManufacturingProcurementOptimization />} />
          <Route path="/retail_promotion_effectiveness" element={<RetailPromotionEffectiveness />} />
          <Route path="/menu_planning_agent" element={<MenuPlanningAgent />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
  
);

export default App;
