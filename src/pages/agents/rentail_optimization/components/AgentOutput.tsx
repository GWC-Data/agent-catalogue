import React, { useState } from 'react'
import {
  Dialog,
  DialogClose,
  DialogContent,
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
import { useToast } from "@/components/ui/use-toast"
import { approveRetailOptimizationWorkflow, fetchRetailOptimizationAgentOutput, rejectRetailOptimizationWorkflow, startRetailOptimizationWorkflow } from '@/features/retail_optimization/retailOptimizationAgentThunks';
import { AppDispatch, RootState } from '@/app/store';
import { useDispatch, useSelector } from 'react-redux';
import { generateExecutor, generateThreadId } from '@/utils/generateThreadId';

const AgentOutput = () => {

    const [open, setOpen] = useState(false);
    const [availableBudget, setAvailableBudget] = useState<string>("1");
    const [showBudget, setShowBudget] = useState<boolean>(true)
    const [showAgent, setShowAgent] = useState<boolean>(false)
    const [showApproval, setShowApproval] = useState<boolean>(false);
    const [showWorkflowApprove, setShowWorkflowApprove] = useState<boolean>(false);
    const [result, setResult] = useState<boolean>(false);
    const [message, setMessage] = useState("");
    const approverRef = React.useRef<HTMLInputElement>(null);
    const commentsRef = React.useRef<HTMLInputElement>(null);
    const { toast } = useToast()
    const { workflowId } = useSelector(
      (state: RootState) => state.retailOptimization
    )
  

  //Fetching POST method for Approval 
  const dispatch = useDispatch<AppDispatch>()

  const handleOutput = async () => {
    setShowBudget(false)
  
    await dispatch(
      startRetailOptimizationWorkflow({
        availableBudget: Number(availableBudget) || 1,
        executor: generateExecutor(),
        threadId: generateThreadId(),
      })
    ).unwrap()
  
    setShowApproval(true)
  }

  const { approvalData, productOutput, agentLoading } = useSelector(
    (state: RootState) => state.retailOptimization
  )
  
  const handleAgentOutput = async () => {
    if (!workflowId) return
    setShowApproval(false)

    await dispatch(fetchRetailOptimizationAgentOutput(workflowId)).unwrap()

    setShowAgent(true)
  
    toast({
      title: "Success",
      description: "Agent data fetched successfully.",
      duration: 1000,
      className: "bg-green-600 text-white border-green-700",
    })
  }

  const handleApprove = async (approver: string, comments: string) => {
  if (!workflowId) return

  setShowWorkflowApprove(false)
  setShowAgent(false)
  setResult(true)

  try {
    await dispatch(
      approveRetailOptimizationWorkflow({
        workflowId,
        approver,
        comments,
      })  
      ).unwrap()

    setMessage("Approved")
  } catch (error) {
    console.error("Error rejecting workflow:", error)
  }
}

const handleReject = async () => {
  if (!workflowId) return

  setShowAgent(false)
  setResult(true)

  try {
    await dispatch(
      rejectRetailOptimizationWorkflow(workflowId)
    ).unwrap()

    setMessage("Rejected")
  } catch (error) {
    console.error("Error rejecting workflow:", error)
  }
}
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
      setShowAgent(false)
      setShowWorkflowApprove(false)
    }
  }}
>
  {/* Agent Button */}
  <DialogTrigger>
    <Button>Agent</Button>
  </DialogTrigger>

  <DialogContent className="sm:max-w-[450px] bg-white">

    {/* REQUIRED for accessibility */}
    {!result && !showWorkflowApprove &&
    <DialogHeader>
      <DialogTitle>Agent Execution</DialogTitle>
    </DialogHeader>
    }

    {/* Workflow Approve pop-up */}
    {showWorkflowApprove && (
  <div>
    <DialogHeader>
      <DialogTitle>Approval Details</DialogTitle>
    </DialogHeader>

    <div className="grid gap-4 py-5">
      <div className="grid gap-1.5">
      <Label htmlFor="approver">Approver</Label>
    <Input
      id="approver"
      ref={approverRef}
      placeholder="Enter approver name"
      className='bg-white'
    />
  </div>

  <div className="grid gap-1.5">
    <Label htmlFor="comments">Comments</Label>
    <Input
      id="comments"
      ref={commentsRef}
      placeholder="Enter comments"
      className='bg-white'
    />
      </div>
    </div>

    <DialogFooter className="flex justify-end gap-3">
      <Button
        variant="outline"
        onClick={() => setShowWorkflowApprove(false)}
      >
        Cancel
      </Button>

      <Button
        onClick={() => {
        const approver = approverRef.current?.value || "";
        const comments = commentsRef.current?.value || "";

        handleApprove(approver, comments); // ✅ pass directly
      }}
>
        Submit
      </Button>
    </DialogFooter>
  </div>
)}
    
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
        Workflow ID: {workflowId}
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
    {agentLoading && (
      <div className="flex items-center justify-center h-64 w-full flex-col">
        <Loader2 className="mb-2 h-5 w-5 animate-spin" />
        <span className="text-sm">🤖 Agent is Loading...</span>
      </div>
    )}

    {/* STEP 3: Approval response */}
    {showApproval &&!showAgent && !showBudget && !agentLoading && !showWorkflowApprove && approvalData && (
      <div className="space-y-3">

    <div className=" py-2 text-sm text-blue-800">
      <strong>Workflow ID:</strong> <span className="font-medium">{workflowId}</span>
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
    {showAgent && !agentLoading && !showWorkflowApprove && productOutput && (
      <div>
     <DialogContent className="max-w-[95vw] sm:max-w-[95vw] w-full h-[90vh] flex flex-col bg-white overflow-auto" 
     onWheel={(e) => e.stopPropagation()}>
      <DialogTitle>Results</DialogTitle>
      <Tabs defaultValue="product" className="w-full">
        <TabsList className='w-full'>
          <TabsTrigger value="product" className='w-full bg-white'>Product</TabsTrigger>
        </TabsList>

        <TabsContent value="product" className='pb-10'>
          <ProductTableOutput data={productOutput} 
          onShowApprove={() => setShowWorkflowApprove(true)}
          onReject={handleReject}/>
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