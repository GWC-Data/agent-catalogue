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

    const handleOutput = () => {
        setLoading(true);
        fetch("https://aai-case-study-retail-optimization-462434048008.asia-south2.run.app/api/v1/workflows/start", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            available_budget: 1,
            executor: "biufy",
            thread_id: "12334"
          }),
        })
        .then((response) => response.json())
        .then((data) => {
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
        <DialogContent className="sm:max-w-[425px]">
            <div className="grid gap-3">
              <Label htmlFor="budget">Enter The Budget</Label>
              <Input id="budget" name="budget-1"/>
            </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={handleOutput}>Save changes</Button>
          </DialogFooter>

          <div>
            {loading ? (
              <div className="flex items-center justify-center h-96 w-full flex-col">
               <Loader2 className="mb-2 h-5 w-5 animate-spin" />
               <span className="text-sm">🤖 Agent is Loading...</span>
              </div>
            ) : (
              <div className='container mx-auto mt-5'>
                
              </div>
            )}
          </div>
        </DialogContent>
    </Dialog>
  )
}

export default AgentOutput