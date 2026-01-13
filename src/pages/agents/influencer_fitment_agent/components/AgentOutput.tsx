import React, { useState } from 'react'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import AiScoringTableOutput from './AiScoringTableOutput';
import FitmentScoresTableOutput from './FitmentScoresTableOutput';
import CampaignTableOutput from './CampaignTableOutput';
import { formatCampaignReport } from '../utils/formateCampaignReport';
import { formatFitmentScores } from '../utils/formatFitmentScores';
import { formatAiScoring } from '../utils/formatAiScoring';
import { useToast } from "@/components/ui/use-toast"

const AgentOutput = () => {

  const { toast } = useToast()
    const [loading, setLoading] = useState<boolean>(false);
    const [aiScroing, setAiScroing] = useState<any>([]);
    const [fitmentScores, setFitmentScores] = useState<any>([]);
    const [campaigns, setCampaigns] = useState<any>([]);
  
    // Generates random 4-digit number as string
    const generateThreadId = (): string => {
      return Math.floor(1000 + Math.random() * 9000).toString();
  };

  //Fetching POST method for Approval 
    const handleOutput = () => {
      setLoading(true);
        fetch("https://influencerfitmentagent-462434048008.asia-south1.run.app/execute-workflow", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            thread_id: generateThreadId()
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            handleWorkflowOutput(data?.message)
            setLoading(false);
        })
        .catch((error) => {
            console.error("Error fetching output data:", error);
            setLoading(false);
        });
    }
    const handleWorkflowOutput = (message: string) => {
      setLoading(true);
        Promise.all([
          fetch("https://influencerfitmentagent-462434048008.asia-south1.run.app/output/ai_scoring")
            .then(res => res.json()),
          fetch("https://influencerfitmentagent-462434048008.asia-south1.run.app/output/fitment_scores")
            .then(res => res.json()),
          fetch("https://influencerfitmentagent-462434048008.asia-south1.run.app/output/campaign_report")
            .then(res => res.json())
        ])
        .then(([aiScoringData, fitmentScoresData, campaignData]) => {
          setAiScroing(formatAiScoring(aiScoringData?.data))
          setFitmentScores(formatFitmentScores(fitmentScoresData?.data))
          setCampaigns(formatCampaignReport(campaignData?.data))
          setLoading(false);
          toast({
            title: "Success",
            description: message,
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
        })
    }

  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <Button onClick={handleOutput}>Agent</Button>
        </DialogTrigger>
        <DialogContent className="max-w-[95vw] sm:max-w-[95vw] w-full h-[90vh] flex flex-col bg-white overflow-auto">
          <DialogHeader>
            <DialogTitle>Agent</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <div>
            {loading ? (
                  <div className="flex items-center justify-center h-96 w-full flex-col">
                    <Loader2 className="mb-2 h-5 w-5 animate-spin" />
                    <span className="text-sm">🤖 Agent is Loading...</span>
                  </div>
                ) : (
              <div className='container mx-auto mt-5'>
                    <Tabs defaultValue="ai_scoring" className="w-full ">
                      
                  <TabsList className='w-full'>
                    <TabsTrigger value="ai_scoring" className='w-full bg-white'>Ai Scoring</TabsTrigger>
                    <TabsTrigger value="fitment_scores" className='w-full bg-white'>Fitment Scores</TabsTrigger>
                    <TabsTrigger value="campaign_report" className='w-full bg-white'>Campaign Report</TabsTrigger>
                  </TabsList>
                    
                  <TabsContent value="ai_scoring" className='pb-10'>
                    <AiScoringTableOutput data={aiScroing} />
                  </TabsContent>
                  <TabsContent value="fitment_scores" className='pb-10'>
                    <FitmentScoresTableOutput data={fitmentScores} />
                  </TabsContent>
                  <TabsContent value="campaign_report" className='pb-10'>
                    <CampaignTableOutput data={campaigns} />
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