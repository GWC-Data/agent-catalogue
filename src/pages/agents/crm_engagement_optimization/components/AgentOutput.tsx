import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ArrowLeftIcon } from "lucide-react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import BestSendWindowsOutput from './BestSendWindowsOutput';
import StructuredMarketingInsightsOutput from './StructuredMarketingInsightsOutput';
import AbTestWinnersOutput from './AbTestWinnersOutput';
import { useToast } from "@/components/ui/use-toast"

const AgentOutput = () => {

  const { toast } = useToast()
    const [loading, setLoading] = useState<boolean>(true);
    const [actionsMessage, setActionsMessage] = useState<any>([])
    const [recommendedChannel, setRecommendedChannel] = useState<any>(null)
    const [bestSendWindows, setBestSendWindows] = useState<any>([])
    const [structuredMarketingInsights, setStructuredMarketingInsights] = useState<any>([])
    const [abTestWinners, setAbTestWinners ] = useState<any>([])

    const handleOutput = () => {
        setLoading(true);
        fetch("https://email-crm-engagement-optimization-agent-462434048008.asia-south1.run.app/agent", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        })
        .then((response) => response.json())
        .then((data) => {
            setActionsMessage(data?.next_actions)
            setRecommendedChannel(data?.recommended_channel)
            setBestSendWindows(data?.best_send_windows)
            setStructuredMarketingInsights(data?.structured_marketing_insights)
            setAbTestWinners(data?.ab_test_winners)
            setLoading(false);
            toast({
              title: "Success",
              description:"Agent data fetched successfully",
              className: "bg-green-600 text-white border-green-700",
            })
        })
        .catch((error) => {
            console.error("Error fetching output data:", error);
            setLoading(false);
            toast({
              variant: "destructive",
              title: "Error",
              description: "Something went wrong",
            })
        });
    }
  return (
    <Dialog>
        <DialogTrigger>
          <Button onClick={handleOutput}>Agent</Button>
        </DialogTrigger>
        <DialogContent className="max-w-[95vw] sm:max-w-[95vw] w-full h-[90vh] flex flex-col bg-white overflow-auto">
          <DialogHeader>
            <DialogTitle>Results</DialogTitle>
          </DialogHeader>
          <div>
            {loading ? (
              <div className="flex items-center justify-center h-96 w-full flex-col">
               <Loader2 className="mb-2 h-5 w-5 animate-spin" />
               <span className="text-sm">🤖 Agent is Loading...</span>
              </div>
            ) : (
              <div className='container mx-auto mt-5'>

                <Tabs defaultValue="best_send_windows" className="w-full ">

                <Accordion type="multiple" className="w-full  grid grid-cols-2 gap-3">
  {/* Accordion 1 – Next Actions */}
  <AccordionItem value="next-actions" className="border-none">
    <AccordionTrigger className="p-2 hover:no-underline border rounded-md"> 
        <span>Next Actions</span>
    </AccordionTrigger>

    <AccordionContent className="pt-2">
      <div className="w-[654px] max-h-[320px] overflow-y-auto p-4 border rounded-md">
        <div className="space-y-1">
          {actionsMessage?.map((text: string, index: number) => (
            <div
              key={index}
              className="rounded-md p-2 text-sm text-gray-800"
            >
              {index + 1}. {text}
            </div>
          ))}
        </div>
      </div>
    </AccordionContent>
  </AccordionItem>

  {/* Accordion 2 – Recommended Channel */}
  <AccordionItem value="recommended-channel" className="border-none">
    <AccordionTrigger className="p-2 hover:no-underline border rounded-md">
        <span>Recommended Channel</span>
    </AccordionTrigger>

    <AccordionContent className="pt-2">
      <div className="w-[662px] p-4 border rounded-md">
        <div className="space-y-3">
          <div className="text-sm flex gap-2">
            <span className="text-muted-foreground">Preferred Channel</span>
            <ArrowLeftIcon className="h-4 w-3 mt-0.5 rotate-180 text-gray-500" />
            <div className="font-medium">
              {recommendedChannel?.preferred_channel ?? "—"}
            </div>
          </div>

          <div className="rounded-md border p-3 text-sm">
            <div className="font-semibold mb-1">Decision Reason</div>
            {recommendedChannel?.decision_reason ?? "—"}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-md border p-2 text-sm">
              <div className="text-muted-foreground text-xs">Email</div>
              <div className='flex gap-2'>
                  <div className='font-medium'>Avg Conversion Rate:</div>
                  {recommendedChannel?.channel_summary?.Email?.avg_conversion_rate ?? "—"}
              </div>
              <div className='flex gap-2'>
                  <div className='font-medium'>Avg Roi:</div>
                  {recommendedChannel?.channel_summary?.Email?.avg_roi ?? "—"}
              </div>
            </div>

            <div className="rounded-md border p-2 text-sm">
              <div className="text-muted-foreground text-xs">SMS</div>
              <div className='flex gap-2'>
                  <div className='font-medium'>Avg Conversion Rate:</div>
                  {recommendedChannel?.channel_summary?.SMS?.avg_conversion_rate ?? "—"}
              </div>
              <div className='flex gap-2'>
                  <div className='font-medium'>Avg Roi:</div>
                  {recommendedChannel?.channel_summary?.SMS?.avg_roi ?? "—"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AccordionContent>
  </AccordionItem>
</Accordion>

                  <TabsList className='w-full mt-4'>
                    <TabsTrigger value="best_send_windows" className='w-full bg-white'>Best Send Windows</TabsTrigger>
                    <TabsTrigger value="structured_marketing_insights" className='w-full bg-white'>Structured Marketing Insights</TabsTrigger>
                    <TabsTrigger value="ab_test_winners" className='w-full bg-white'>Ab Test Winners</TabsTrigger>
                  </TabsList>
                    
                  <TabsContent value="best_send_windows" className='pb-10'>
                    <BestSendWindowsOutput data={bestSendWindows} />
                  </TabsContent>
                  <TabsContent value="structured_marketing_insights" className='pb-10'>
                    <StructuredMarketingInsightsOutput data={structuredMarketingInsights} />
                  </TabsContent>
                  <TabsContent value="ab_test_winners" className='pb-10'>
                    <AbTestWinnersOutput data={abTestWinners} />
                  </TabsContent>
                  
                </Tabs>
              </div>
            )}
          </div>
        </DialogContent >
    </Dialog>
  )
}

export default AgentOutput