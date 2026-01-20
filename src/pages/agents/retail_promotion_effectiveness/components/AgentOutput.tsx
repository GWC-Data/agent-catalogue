import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from '@/components/ui/button';
import { ArrowLeftIcon, Loader2 } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/app/store';
import { ProductTableOutput } from './ProductTableOutput';
import { fetchRetailPromotionAgentOutput } from '@/features/Retail_promotion_effectiveness/retailPromotionAgentThunks';

const AgentOutput = () => {

    const { toast } = useToast()
    const [showDropdown, setShowDropdown] = useState<boolean>(false);
    const dispatch = useDispatch<AppDispatch>()

    const { agentOutput, agentLoading } = useSelector(
      (state: RootState) => state.retailPromotion
    )
    
    const handleRunAgent = async () => {
      try {
        await dispatch(fetchRetailPromotionAgentOutput()).unwrap()
        setShowDropdown(true)
        toast({
          title: "Agent Executed",
          description: "Retail promotion agent ran successfully.",
          className: "bg-green-600 text-white border-green-700",
        })
      } catch (error: any) {
        toast({
          variant: "destructive",
          title: "Agent Failed",
          description: error || "Something went wrong while running the agent.",
        })
      }
    }
    
    
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button onClick={handleRunAgent}>Agent</Button>
        </DialogTrigger>
        <DialogContent className="max-w-[95vw] sm:max-w-[95vw] w-full h-[90vh] flex flex-col bg-white overflow-auto">
          <DialogHeader>
            <DialogTitle>Agent</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>

          <div>
            {agentLoading ? (
                  <div className="flex items-center justify-center h-96 w-full flex-col">
                    <Loader2 className="mb-2 h-5 w-5 animate-spin" />
                    <span className="text-sm">🤖 Agent is Loading...</span>
                  </div>
                ) : (
              <div className='container mx-auto mt-5'>
                    <Tabs defaultValue="agentData" className="w-full ">
                      
{showDropdown && 
        <Accordion type="multiple" className="w-full mb-2">
  <AccordionItem value="summary" className="border-none">
    <AccordionTrigger className="p-2 hover:no-underline border-2 rounded-md">
      <span>Promotion Summary</span>
    </AccordionTrigger>

    <AccordionContent className="pt-2">
      <div className="p-4 border-2 rounded-md">
        <div className="space-y-4">

          {/* Total Promotions */}
          <div className="text-sm flex gap-2">
            <span className="text-muted-foreground">Total Promotions</span>
            <ArrowLeftIcon className="h-4 w-3 mt-0.5 rotate-180 text-gray-500" />
            <div className="font-medium">
              {agentOutput.summary.total_promotions}
            </div>
          </div>

          {/* Counts */}
          <div className="grid grid-cols-2 gap-4">

  {/* LEFT: Promotion Status */}
  <div className="rounded-md border-2 p-3 text-sm">
    <div className="font-semibold mb-2">Promotion Status</div>

    <div className="flex gap-2">
      <span>Repeat</span>
      <ArrowLeftIcon className="h-4 w-3 mt-0.5 rotate-180" />
      <span className="font-medium">
        {agentOutput.summary.counts.repeat}
      </span>
    </div>

    <div className="flex gap-2">
      <span>Monitor</span>
      <ArrowLeftIcon className="h-4 w-3 mt-0.5 rotate-180" />
      <span className="font-medium">
        {agentOutput.summary.counts.monitor}
      </span>
    </div>

    <div className="flex gap-2">
      <span>Stop</span>
      <ArrowLeftIcon className="h-4 w-3 mt-0.5 rotate-180" />
      <span className="font-medium">
        {agentOutput.summary.counts.stop}
      </span>
    </div>
  </div>

  {/* RIGHT: Metrics stacked */}
  <div className="flex flex-col gap-3">

    <div className="rounded-md border-2 p-2 text-sm">
      <div className="text-muted-foreground text-xs">
        Average ROI
      </div>
      <div className="font-medium">
        {agentOutput.summary.avg_roi.toFixed(2)}
      </div>
    </div>

    <div className="rounded-md border-2 p-2 text-sm">
      <div className="text-muted-foreground text-xs">
        Average Uplift
      </div>
      <div className="font-medium">
        {(agentOutput.summary.avg_uplift )}
      </div>
    </div>

  </div>
</div>

          {/* Revenue */}
          <div className="rounded-md border-2 p-3 text-sm">
            <div className="font-semibold mb-1">Total Revenue</div>
            ₹{agentOutput.summary.total_revenue.toLocaleString()}
          </div>

          {/* Top Promotions */}
          <div className="rounded-md border-2 p-3 text-sm">
            <div className="font-semibold mb-2">Top Promotions</div>

            <div className="space-y-2">
              {agentOutput.summary.top_promotions.map((promo) => (
                <div
                  key={promo.promo_id}
                  className="flex justify-between text-sm"
                >
                  <span>
                    {promo.product_name} ({promo.promo_id})
                  </span>
                  <span className="font-medium">
                    ROI {promo.roi}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </AccordionContent>
  </AccordionItem>
</Accordion>
           }           
                  <TabsList className='w-full'>
                    <TabsTrigger value="agentData" className='w-full bg-white'>Agent Output</TabsTrigger>
                  </TabsList>
                    
                  <TabsContent value="agentData" className='pb-10'>
                    <ProductTableOutput data={agentOutput?.future_promotions?.recommended_count} />
                  </TabsContent>
                  
                </Tabs>
              </div> 
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default AgentOutput