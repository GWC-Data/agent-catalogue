/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react'
import {
  Dialog,
  DialogClose,
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

const AgentOutput = () => {
  const { toast } = useToast()
    const [loading, setLoading] = useState<boolean>(true);
    const [leadsOutput, setLeadsOutput] = useState<any>(null);
    const [message, setMessage] = useState<string>("")
    const [openChildDialog, setOpenChildDialog] = useState<boolean>(false);

    const handleOutput = () => {
      setOpenChildDialog(false)
        setLoading(true);
        fetch("https://lead-distribution-agent-462434048008.asia-south2.run.app/trigger", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        })
        .then((response) => response.json())
        .then((data) => {
            setTimeout(() => {
              console.log(data?.leads)
              setLeadsOutput(data?.leads);
              setLoading(false);
              toast({
                title: "Success",
                description:"Agent data fetched successfully",
                duration: 2000,
                className: "bg-green-600 text-white border-green-700",
              })
            }, 2000);
        })
        .catch((error) => {
            console.error("Error fetching output data: ", error);
            setLoading(false);
            toast({
              variant: "destructive",
              title: "Error",
              duration: 2000,
              description: "Something went wrong",
            })
        });
    }
    const handleReset = async () => {
      setLoading(true);
      setOpenChildDialog(true)
        fetch(`https://lead-distribution-agent-462434048008.asia-south2.run.app/reset`, {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          })
        .then((response) => response.json())
        .then((data) => {   
          setMessage(data?.message)
          setLoading(false);
        })
        .catch((error) => {
            console.error("Error fetching output data:", error);
            setLoading(false);
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

          {openChildDialog && (
  <Dialog open={openChildDialog} onOpenChange={setOpenChildDialog}>
    <DialogContent className="max-w-sm">
      <DialogHeader>
        <DialogTitle className="text-[16px] font-semibold">
          {message}
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
)}
          <div>
            {loading ? (
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
