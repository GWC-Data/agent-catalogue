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
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Loader2 } from 'lucide-react';

const AgentOutput = () => {

    const [loading, setLoading] = useState<boolean>(false);
    const [availableBudget, setAvailableBudget] = useState<string>("");
    const [showBudget, setShowBudget] = useState<boolean>(true)
    const [approvalData, setApprovalData] = React.useState<any>(null);

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

    const handleOutput = () => {
        setLoading(true);
        setShowBudget(false)
        fetch("https://aai-case-study-retail-optimization-462434048008.asia-south2.run.app/api/v1/workflows/start", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            available_budget: Number(availableBudget) || 0,
            executor: generateExecutor(),
            thread_id: generateThreadId()
          }),
        })
        .then((response) => response.json())
        .then((data) => {
          setApprovalData(data.__interrupt__[0].value);
            setTimeout(() => {
              setLoading(false);
            }, 2000);
            console.log(data)
        })
        .catch((error) => {
            console.error("Error fetching output data:", error);
            setLoading(false);
        });
    }

  return (
    <Dialog>
  <DialogTrigger>
    <Button>Agent</Button>
  </DialogTrigger>

  <DialogContent className="sm:max-w-[600px]">

    {/* REQUIRED for accessibility */}
    <DialogHeader>
      <DialogTitle>Agent Execution</DialogTitle>
      <DialogDescription>
        Budget input and approval workflow
      </DialogDescription>
    </DialogHeader>

    {/* STEP 1: Budget input */}
    {showBudget && (
      <div className="grid gap-3">
        <Label htmlFor="budget">Enter The Budget</Label>

        <Input
          id="budget"
          name="budget-1"
          value={availableBudget}
          onChange={(e) => {
            const value = e.target.value;
            if (/^\d*$/.test(value)) {
              setAvailableBudget(value);
            }
          }}
        />

        <DialogFooter>
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
    {!showBudget && !loading && approvalData && (
      <div className="mt-4 space-y-3">

    <div className="rounded-md border bg-blue-50 px-3 py-2 text-sm text-blue-800">
      <strong>Workflow ID:</strong> {approvalData["Workflow ID"]}
    </div>

        <div className="text-sm font-medium text-gray-700">
          {approvalData.message}
        </div>

        <div className="max-h-[300px] overflow-y-auto whitespace-pre-wrap rounded-md border bg-gray-50 p-4 text-sm">
          {approvalData.approval_request}
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>

          <Button className="bg-green-600 text-white">
            Approve
          </Button>

          <Button variant="destructive">
            Reject
          </Button>
        </DialogFooter>
      </div>
    )}

  </DialogContent>
</Dialog>
  )
}

export default AgentOutput