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
import { DisposalTableOutput } from './DisposalTableOutput';
import { useToast } from "@/components/ui/use-toast"

const AgentOutput = () => {
  const { toast } = useToast()
    const [loading, setLoading] = useState<boolean>(true);
    const [disposal, setDisposal] = useState<any>(null);

    // Generates random 4-digit number as string
    const generateThreadId = (): string => {
      return Math.floor(1000 + Math.random() * 9000).toString();
  };

    const handleOutput = () => {
        setLoading(true);
        const threadId = generateThreadId();
        console.log(threadId)
        fetch(`https://inventorydisposal-462434048008.asia-south1.run.app/disposal/run?thread_id=${threadId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        }
      })
        .then((response) => response.json())
        .then((data) => {
          setTimeout(() => {
            setDisposal(data?.results);
            setLoading(false);
            toast({
              title: "Success",
              description:"Campaign analysis completed.",
              className: "bg-green-600 text-white border-green-700",
            })
          }, 2000);
              
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
            {loading ? (
              <div className="flex items-center justify-center h-96 w-full flex-col">
               <Loader2 className="mb-2 h-5 w-5 animate-spin" />
               <span className="text-sm">🤖 Agent is Loading...</span>
              </div>
            ) : (
              <div className='container mx-auto mt-5'>
                <Tabs defaultValue="disposal" className="w-full ">
                  <TabsList className='w-full'>
                    <TabsTrigger value="disposal" className='w-full bg-white'>Disposal</TabsTrigger>
                  </TabsList>
                  <TabsContent value="disposal" className='pb-10'>
                    <DisposalTableOutput data={disposal} />
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
