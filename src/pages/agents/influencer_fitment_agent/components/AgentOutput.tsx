import {
  Dialog,
  DialogContent,
  DialogDescription,
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
import { useToast } from "@/components/ui/use-toast"
import { AppDispatch, RootState } from '@/app/store';
import { useDispatch, useSelector } from 'react-redux';
import { runInfluencerFitmentWorkflow } from '@/features/influencer_fitment/influencerFitmentAgentThunks';

const AgentOutput = () => {

  const { toast } = useToast()
  const dispatch = useDispatch<AppDispatch>()

const {aiScoring, fitmentScores, campaignReport, agentLoading, agentMessage } = useSelector(
  (state: RootState) => state.influencerFitment
)

const handleOutput = async () => {
  try {
    await dispatch(runInfluencerFitmentWorkflow()).unwrap()

    toast({
      title: "Success",
      description: agentMessage || "Workflow completed successfully",
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
        <DialogTrigger asChild>
          <Button onClick={handleOutput}>Agent</Button>
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
                    <Tabs defaultValue="ai_scoring" className="w-full ">
                      
                  <TabsList className='w-full'>
                    <TabsTrigger value="ai_scoring" className='w-full bg-white'>Ai Scoring</TabsTrigger>
                    <TabsTrigger value="fitment_scores" className='w-full bg-white'>Fitment Scores</TabsTrigger>
                    <TabsTrigger value="campaign_report" className='w-full bg-white'>Campaign Report</TabsTrigger>
                  </TabsList>
                    
                  <TabsContent value="ai_scoring" className='pb-10'>
                    <AiScoringTableOutput data={aiScoring} />
                  </TabsContent>
                  <TabsContent value="fitment_scores" className='pb-10'>
                    <FitmentScoresTableOutput data={fitmentScores} />
                  </TabsContent>
                  <TabsContent value="campaign_report" className='pb-10'>
                    <CampaignTableOutput data={campaignReport} />
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