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

const AgentOutput = () => {

  const { toast } = useToast()
    const [loading, setLoading] = useState<boolean>(false);
    const [showApproval, setShowApproval] = useState<boolean>(false);
    const [agentData, setAgentData] = useState<any>([]);
    const [threadId, setThreadId] = useState<string>("");
    const [approvalComment, setApprovalComment] = useState<string>("")

  
    // Generates random 4-digit number as string
    const generateThreadId = (): string => {
      return Math.floor(1000 + Math.random() * 9000).toString();
  };

  const handleOutput = async () => {
    setLoading(true);
    setThreadId(generateThreadId())
    fetch("https://manufacturingagent-462434048008.asia-south1.run.app/v1/agent/run", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({
        thread_id: threadId
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data[0])
        setAgentData(data[0].value.pending_negotiation)
        setLoading(false)
    })
    .catch((error) => {
        console.error("Error fetching output data:", error);
        setLoading(false);
    });
}
const handleApprovOutput = async () => {
  setLoading(true);
  fetch("https://manufacturingagent-462434048008.asia-south1.run.app/v1/agent/resume", {
  method: "POST",
  headers: {
      "Content-Type": "application/json",
  },
  body: JSON.stringify({
      thread_id: threadId,
      approved: true,
      comments: approvalComment
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
      setLoading(false)
      toast({
        title: data?.status,
        description: "Agent data Approved successfully.",
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
const handleCloseApproval = () => {
  setApprovalComment("")
  setShowApproval(false)
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
            handleApprovOutput()
            setShowApproval(false) // close popup after save
            handleCloseApproval()
          }}
        >
          Submit
        </Button>
      </DialogFooter>
    </div>
  </DialogContent>
</Dialog>
            {loading ? (
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