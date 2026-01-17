/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2 } from 'lucide-react';
import { TopTenOutput } from './TopTenOutput';
import { BottomTenOutput } from './BottomTenOutput copy';
import { useToast } from "@/components/ui/use-toast"
import { fetchCampaignPerformanceAgentOutput } from '@/features/campaign_performance/campaignPerformanceAgentThunks';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/app/store';

const AgentOutput = () => {
  const { toast } = useToast()
  const dispatch = useDispatch<AppDispatch>()

const { topTen, bottomTen, agentLoading } = useSelector(
  (state: RootState) => state.campaignPerformance
)

const handleOutput = async () => {
  try {
    await dispatch(fetchCampaignPerformanceAgentOutput()).unwrap()

    toast({
      title: "Success",
      description: "Agent data fetched successfully",
      className: "bg-green-600 text-white border-green-700",
    })
  } catch (error: any) {
    toast({
      variant: "destructive",
      title: "Error",
      description: error || "Something went wrong",
    })
  }
}
  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <Button onClick={handleOutput}>Agent</Button>
        </DialogTrigger>
        <DialogContent className="max-w-[95vw] sm:max-w-[95vw] w-full h-[90vh] flex flex-col bg-white overflow-auto">
          <DialogHeader>
            <DialogTitle>Results</DialogTitle>
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
                <Tabs defaultValue="top_10" className="w-full ">
                  <TabsList className='w-full'>
                    <TabsTrigger value="top_10" className='w-full bg-white'>Top 10</TabsTrigger>
                    <TabsTrigger value="bottom_10" className='w-full bg-white'>Bottom 10</TabsTrigger>
                  </TabsList>
                  <TabsContent value="top_10" className='pb-10'>
                    <TopTenOutput data={topTen} />
                  </TabsContent>
                  <TabsContent value="bottom_10" className='pb-10'>
                    <BottomTenOutput data={bottomTen} />
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

export default AgentOutput;
