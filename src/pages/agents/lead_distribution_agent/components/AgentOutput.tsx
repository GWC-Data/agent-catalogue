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
import { useToast } from "@/components/ui/use-toast"
import { LeadTableOutput } from './LeadTableOutput';
import { resetLeadDistributionAgent, runLeadDistributionAgent } from '@/features/lead_distribution/leadDistributionAgentThunks';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/app/store';

const AgentOutput = () => {
  const { toast } = useToast()
    const dispatch = useDispatch<AppDispatch>()

const { leadsOutput, agentLoading } = useSelector(
  (state: RootState) => state.leadDistribution
)

const handleOutput = async () => {
  try {
    await dispatch(runLeadDistributionAgent()).unwrap()

    toast({
      title: "Success",
      description: "Agent data fetched successfully",
      duration: 2000,
      className: "bg-green-600 text-white border-green-700",
    })
  } catch (error: any) {
    toast({
      variant: "destructive",
      title: "Error",
      duration: 2000,
      description: error,
    })
  }
}

const handleReset = async () => {
  try {
    const result = await dispatch(resetLeadDistributionAgent()).unwrap()
    toast({
      title: "Reset Successful",
      description: result.message,
      duration: 2000,
    })

    // ✅ IMPORTANT: re-run agent after reset dialog close
    await dispatch(runLeadDistributionAgent()).unwrap()
  } catch (error: any) {
    toast({
      variant: "destructive",
      title: "Reset Failed",
      description: error,
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
            <DialogTitle>Results</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>

          {/* {openChildDialog && (
  <Dialog open={openChildDialog} onOpenChange={setOpenChildDialog}>
    <DialogContent className="max-w-sm">
      <DialogHeader>
        <DialogTitle className="text-[16px] font-semibold">
          {resetMessage}
        </DialogTitle>
      </DialogHeader>

      <div className="flex justify-end mt-3">
        <Button
          variant="destructive"
          size="sm"
          onClick={() => {
            handleOutput()    // refresh table
          }}
        >
          Close
        </Button>
      </div>
    </DialogContent>
  </Dialog>
)} */}

          <div>
            {agentLoading ? (
              <div className="flex items-center justify-center h-96 w-full flex-col">
               <Loader2 className="mb-2 h-5 w-5 animate-spin" />
               <span className="text-sm">🤖 Agent is Loading...</span>
              </div>
            ) : (
              <div className='container mx-auto mt-5'>
                <Tabs defaultValue="leads" className="w-full ">
                  <TabsList className='leads'>
                    <TabsTrigger value="leads" className='w-full bg-white'>Leads</TabsTrigger>
                  </TabsList>
                  <TabsContent value="leads" className='pb-10'>
                    <LeadTableOutput data={leadsOutput} 
                    onReset={handleReset}/>
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
