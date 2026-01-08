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
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Loader2 } from 'lucide-react';
import { ProductTableOutput } from './ProductTableOutput';

const AgentOutput = () => {

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [availableBudget, setAvailableBudget] = useState<string>("1");
    const [showBudget, setShowBudget] = useState<boolean>(true)
    const [showAgent, setShowAgent] = useState<boolean>(false)
    const [showApproval, setShowApproval] = useState<boolean>(false)
    const [result, setResult] = useState<boolean>(false);
    const [message, setMessage] = useState("");
    const [approvalData, setApprovalData] = React.useState<any>(null);
    const [agentOutput, setAgentOutput] = React.useState<any>(null);
    const [workFlowId, setWorkFlowId] = useState<number>(() => {
    const stored = localStorage.getItem("workFlowId");
      return stored ? Number(stored) : 0;
    });
  

    // Generates random 5-letter lowercase string
    const generateExecutor = (): string => {
    const letters = "abcdefghijklmnopqrstuvwxyz";
    let result = "";
    for (let i = 0; i < 5; i++) {
      result += letters.charAt(Math.floor(Math.random() * letters.length));
    }
      return result;
  };

    // Generates random 4-digit number as string
    const generateThreadId = (): string => {
      return Math.floor(1000 + Math.random() * 9000).toString();
  };

  //Fetching POST method for Approval 
    const handleOutput = () => {
        setLoading(true);
        setShowBudget(false)
        fetch("https://aai-case-study-retail-optimization-462434048008.asia-south2.run.app/api/v1/workflows/start", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            available_budget: Number(availableBudget) || 1,
            executor: generateExecutor(),
            thread_id: generateThreadId()
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            const rawWorkflowId = data.__interrupt__?.[0]?.value?.["Workflow ID"];
            const parsedWorkflowId = Number(rawWorkflowId);

        if (!Number.isNaN(parsedWorkflowId)) {
          setWorkFlowId(parsedWorkflowId);
          localStorage.setItem("workFlowId", String(parsedWorkflowId));
        }
          setApprovalData(data.__interrupt__[0].value);
            setTimeout(() => {
              setLoading(false);
            }, 2000);
            console.log(data)
            setShowApproval(true)
        })
        .catch((error) => {
            console.error("Error fetching output data:", error);
            setLoading(false);
        });
    }

    const handleAgentOutput = () => {
      setLoading(true);
      setShowApproval(false)
      fetch(`https://aai-case-study-retail-optimization-462434048008.asia-south2.run.app/api/v1/workflows/${workFlowId}`)
      .then((response) => response.json())
      .then((data) => {        
            setAgentOutput(data?.current_state?.demand_forecast);
            console.log(data?.current_state?.demand_forecast)
            setShowAgent(true)
            setLoading(false);
      })
      .catch((error) => {
          console.error("Error fetching output data:", error);
          setLoading(false);
      });
  }

  const handleApprove = async () => {
    setLoading(true);
    setShowAgent(false)
    setResult(true);
      fetch(`https://aai-case-study-retail-optimization-462434048008.asia-south2.run.app/api/v1/workflows/${workFlowId}/approve`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            action: "reject",
            approver: "string",
            comments: "string"
          }),
        })
      .then((response) => response.json())
      .then((data) => {   
        console.log(data)     
        setMessage("Approved")
            
            setLoading(false);
      })
      .catch((error) => {
          console.error("Error fetching output data:", error);
          setLoading(false);
      });
  };

  const handleReject = async () => {
    setLoading(true);
    setShowAgent(false)
    setResult(true);
      fetch(`https://aai-case-study-retail-optimization-462434048008.asia-south2.run.app/api/v1/workflows/${workFlowId}`)
      .then((response) => response.json())
      .then((data) => {  
        console.log(data)   
        setMessage("Rejected")
           
            setLoading(false);
      })
      .catch((error) => {
          console.error("Error fetching output data:", error);
          setLoading(false);
      });
  };


  return (
    <Dialog
  open={open}
  onOpenChange={(isOpen) => {
    setOpen(isOpen);

    if (!isOpen) {
      setShowBudget(true)
      setResult(false)
      setAvailableBudget("")
      setAvailableBudget("1")
    }
  }}
>
  {/* Agent Button */}
  <DialogTrigger>
    <Button>Agent</Button>
  </DialogTrigger>

  <DialogContent className="sm:max-w-[450px] bg-white">

    {/* REQUIRED for accessibility */}
    {!result &&
    <DialogHeader>
      <DialogTitle>Agent Execution</DialogTitle>
    </DialogHeader>
    }
    
    {/* Approv and Reject Pop-up*/}
    {result && 
    <div className=" py-2">
    <DialogHeader>
      <DialogTitle
        className={
          message.includes("Approved")
            ? "text-green-600 text-2xl font-semibold"
            : "text-red-600 text-2xl font-semibold"
        }
      >
        {message}
      </DialogTitle>
    </DialogHeader>

    {/* Workflow ID */}
    <div className="mt-3">
      <span className="py-1.5 rounded-md font-semibold text-gray-700 text-sm ">
        Workflow ID: {workFlowId}
      </span>
    </div>

    {/* Close button */}
    <div className="flex justify-end mt-6">
      <DialogClose asChild>
        <Button variant="destructive" size="sm">
          Close
        </Button>
      </DialogClose>
    </div>
  </div>
    }

    {/* STEP 1: Budget input */}
    {showBudget && !result && (
      <div className="grid gap-3">
        <Label htmlFor="budget">Enter The Budget</Label>

        <Input
          id="budget"
          name="budget-1"
          value={availableBudget}
          className='bg-white'
          onChange={(e) => {
            const value = e.target.value;
              if (/^\d*$/.test(value)) {
                setAvailableBudget(value)
              }
          }}
        />

        <DialogFooter className='mt-3'>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button onClick={handleOutput}>
            Save changes
          </Button>
        </DialogFooter>
      </div>
    )}

    {/* STEP 2: Loader */}
    {loading && (
      <div className="flex items-center justify-center h-64 w-full flex-col">
        <Loader2 className="mb-2 h-5 w-5 animate-spin" />
        <span className="text-sm">🤖 Agent is Loading...</span>
      </div>
    )}

    {/* STEP 3: Approval response */}
    {showApproval &&!showAgent && !showBudget && !loading && approvalData && (
      <div className="space-y-3">

    <div className=" py-2 text-sm text-blue-800">
      <strong>Workflow ID:</strong> <span className="font-medium">{workFlowId}</span>
    </div>

        <div className="text-sm font-medium text-gray-700">
          {approvalData.message}
        </div>

        <div className="max-h-[300px] overflow-y-auto whitespace-pre-wrap rounded-md border border-blue-200 p-4 text-sm">
          {approvalData.approval_request}
        </div>

        <DialogFooter>
            <Button onClick={handleAgentOutput}>Close</Button>
        </DialogFooter>
      </div>
    )}

    {/* STEP 4: Final Agent Response */}
    {showAgent && !loading && agentOutput && (
      <div>
     <DialogContent className="max-w-[95vw] sm:max-w-[95vw] w-full h-[90vh] flex flex-col bg-white overflow-auto" 
     onWheel={(e) => e.stopPropagation()}>
      <DialogTitle>Results</DialogTitle>
      <Tabs defaultValue="product" className="w-full">
        <TabsList className='w-full'>
          <TabsTrigger value="product" className='w-full bg-white'>Product</TabsTrigger>
        </TabsList>

        <TabsContent value="product" className='pb-10'>
          <ProductTableOutput data={agentOutput} 
          onApprove={handleApprove}
          onReject={handleReject}
          loading={loading} />
        </TabsContent>
      </Tabs>
      </DialogContent>  
      </div>
    )}

  </DialogContent>
</Dialog>
  )
}

export default AgentOutput