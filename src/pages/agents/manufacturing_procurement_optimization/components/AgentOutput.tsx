import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast"
import { AgentOutputTable } from './AgentOutputTable';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/app/store';
import { approveManufacturingAgent, runManufacturingAgent } from '@/features/manufacturing_optimization/manufacturingAgentThunks';

const AgentOutput = () => {

  const { toast } = useToast()
    const [showApproval, setShowApproval] = useState<boolean>(false);
    const [approvalComment, setApprovalComment] = useState<string>("")

    const dispatch = useDispatch<AppDispatch>()

    const { agentData, agentLoading, threadId, approvedAgentData } = useSelector(
      (state: RootState) => state.manufacturing
    )
    
    const handleRunAgent = async () => {
      dispatch(runManufacturingAgent())   
    }
    
    const handleApproveAgent = async () => {
      if (!threadId) return
      try {
        await dispatch(
          approveManufacturingAgent({
            threadId,
            comments: approvalComment,
          })
        ).unwrap()
    
        toast({
          title: "Approved",
          description: "Agent data approved successfully.",
          className: "bg-green-600 text-white border-green-700",
        })
    
        setApprovalComment("")
        setShowApproval(false)
      } catch (error: any) {
        toast({
          variant: "destructive",
          title: "Approval Failed",
          description: error || "Something went wrong",
        })
      }
    }
    
  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <Button onClick={handleRunAgent}>Agent</Button>
        </DialogTrigger>
        <DialogContent className="max-w-[95vw] sm:max-w-[95vw] w-full h-[90vh] flex flex-col bg-white overflow-auto">
          <DialogHeader>
            <DialogTitle>Agent</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>

{/* Mini Pop-up For approval */}
          <div>
          <Dialog open={showApproval} onOpenChange={setShowApproval}>
  <DialogContent className="sm:max-w-md">
    <DialogHeader>
      <DialogTitle>Enter The Comments</DialogTitle>
      <DialogDescription>
        
      </DialogDescription>
    </DialogHeader>

    <div className="grid gap-3">
      <Label htmlFor="approv"></Label>

      <Input
  id="approv"
  name="approv-1"
  value={approvalComment}
  onChange={(e) => setApprovalComment(e.target.value)}
/>
      <DialogFooter className="mt-3">

        <Button
          onClick={() => {
            handleApproveAgent()
          }}
        >
          Submit
        </Button>
      </DialogFooter>
    </div>
  </DialogContent>
</Dialog>
            {agentLoading ? (
                  <div className="flex items-center justify-center h-96 w-full flex-col">
                    <Loader2 className="mb-2 h-5 w-5 animate-spin" />
                    <span className="text-sm">🤖 Agent is Loading...</span>
                  </div>
                ) : (
              <div className='container mx-auto mt-5'>
                    <Tabs defaultValue="agentData" className="w-full ">
                      
                  <TabsList className='w-full'>
                    <TabsTrigger value="agentData" className='w-full bg-white'>Agent Output</TabsTrigger>
                  </TabsList>
                    
                  <TabsContent value="agentData" className='pb-10'>
                    <AgentOutputTable data={agentData} 
                    onApprove={() => setShowApproval(true)}
                    />
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