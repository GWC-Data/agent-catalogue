/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRightIcon, Loader2, Salad } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast"
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/app/store';
import { approveMenuPlanningAgent, runMenuPlanningAgent } from '@/features/menu_planning/menuPlanningAgentThunks';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { SalesTable } from './SalesTable';
import { RecipesCard } from './RecipesCard';
import { InventoryTableOutput } from './InventoryTableOutput';
import { VendorTableOutput } from './VendorTableOutput';

const AgentOutput = () => {

  const [showApproval, setShowApproval] = useState<boolean>(false);
  const [showAgentOutput, setShowAgentOutput] = useState<boolean>(false);
  const [approvalMessage, setApprovalMessage] = useState<string>("")
  const isApprovalValid = approvalMessage.trim().length > 0;
  
  const { toast } = useToast()
  const dispatch = useDispatch<AppDispatch>()

  const { agentSales, agentInventory, agentVendorOrders,
     agentVendors, agentIngredientRequirement, agentDishScores, threadId, 
     agentOutput, agentLoading } = useSelector(
    (state: RootState) => state.menuPlanning
  )
  
  const handleApproveAgent = async () => {
    setShowApproval(true)
    try {
      await dispatch(runMenuPlanningAgent()).unwrap()
    } catch (error) {
      console.log(error)
    }
  }

const handleAgentOutput = async (message: string) => {
  setShowApproval(false)
  setShowAgentOutput(true)
  if (!threadId) return
  try {
    await dispatch(
      approveMenuPlanningAgent({ threadId, message })
    ).unwrap()

    toast({
      title: "Success",
      description: "Agent data fetched successfully",
      duration: 2000,
      className: "bg-green-600 text-white border-green-700",
    })
  } catch (error) {
    toast({
      variant: "destructive",
      title: "Error",
      duration: 2000,
      description: error,
    })
  }
  setApprovalMessage("")
}
  return (
    <div>
      {agentLoading &&
              <div className="flex items-center justify-center h-96 w-full flex-col">
               <Loader2 className="mb-2 h-5 w-5 animate-spin" />
               <span className="text-sm">🤖 Agent is Loading...</span>
              </div>
            }
      {/* Mini pop-up */}
  <Dialog open={showApproval} onOpenChange={setShowApproval}>
   
    <DialogTrigger asChild>
        <Button onClick={handleApproveAgent}>Agent</Button>
      </DialogTrigger>

    <DialogContent className="sm:max-w-md bg-white">
      <DialogHeader>
        <DialogTitle>Result</DialogTitle>
        <DialogDescription> </DialogDescription>
      </DialogHeader>

{/* 🔹 Agent Output Display */}
{agentOutput && (
  <div className="mb-4 space-y-4 text-sm">

    {/* Message */}
      <div className="text-red-700 font-semibold">
        {agentOutput.message}
      </div>

    {/* Purchase List */}
    <div className="rounded-md border p-3">
      <div className="font-semibold mb-2">Purchase List</div>
      <div className="space-y-1">
      {Object.entries(agentOutput.purchase_list as Record<string, number>).map(
        ([item, qty]) => (
          <div key={item} className="flex justify-between">
            <span>{item}</span>
            <span>{qty}</span>
          </div>
        )
      )}
      </div>
    </div>

    {/* Menu Recommendation */}
    <div className="rounded-md border p-3">
      <div className="font-semibold mb-2">Menu Recommendation</div>
      <ul className="list-disc list-inside">
        {agentOutput.menu_recommendation?.map((dish: string) => (
          <li key={dish}>{dish}</li>
        ))}
      </ul>
    </div>

  </div>
)}

      <div className="grid gap-3">
        <Label>Enter The Approval Comments </Label>
        <Input
        
          id="approv"
          name="approv-1"
          value={approvalMessage}
          onChange={(e) => setApprovalMessage(e.target.value)}
          className={!isApprovalValid && approvalMessage ? "border-red-500" : "bg-white"}
        />
        <DialogFooter className="mt-3">
          <Button
          disabled={!isApprovalValid}
            onClick={() => {
              handleAgentOutput(approvalMessage)
            }}
          >
            Approve
          </Button>
        </DialogFooter>
      </div>
    </DialogContent>
</Dialog>

{showAgentOutput && !agentLoading &&

      <Dialog open={showAgentOutput} onOpenChange={setShowAgentOutput}>
        
        <DialogContent className="max-w-[95vw] sm:max-w-[95vw] w-full h-[90vh] flex flex-col bg-white overflow-auto">
          <DialogHeader>
            <DialogTitle>Results</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <div className="rounded-lg p-3 flex flex-wrap gap-3 items-center bg-white border shadow-sm">

      {/* Title */}
      <span className="text-gray-700 font-semibold text-md">
        Scores
      </span>

      <ArrowRightIcon className="w-4 h-4 text-gray-500" />

      {/* Badges */}
      {Object.entries(agentDishScores as Record<string, number>).map(([dish, score]) => (
  <div
    key={dish}
    className="flex items-center gap-2 bg-[#6f2b8b] text-white px-3 py-1.5 rounded-md text-sm font-medium shadow"
  >
    <span>{dish}</span>
    <span className="bg-white/20 px-2 py-0.5 rounded text-xs">
      {score}
    </span>
  </div>
))}
    </div>
          <div>
              <div className='container mx-auto mt-2'>
                <Tabs defaultValue="recipes" className="w-full" >
                          <div className='flex justify-between items-center'>
                            <TabsList className='w-fit'>
                              <TabsTrigger value="recipes" className='w-fit bg-white'>Recipes</TabsTrigger>
                              <TabsTrigger value="vendors" className='w-fit bg-white'>Vendors</TabsTrigger>
                              <TabsTrigger value="inventory" className='w-fit bg-white'>Inventory</TabsTrigger>
                              <TabsTrigger value="sales" className='w-fit bg-white'>Sales</TabsTrigger>
                            </TabsList>
                          </div>
                           
                          <TabsContent value="recipes" className='pb-10'>
                            <RecipesCard data={agentIngredientRequirement.per_dish} />
                          </TabsContent>
                          <TabsContent value="vendors" className='pb-10'>
                            <VendorTableOutput data={agentVendors} vendorOutput={agentVendorOrders}/>
                          </TabsContent>
                          <TabsContent value="inventory" className='pb-10'>
                            <InventoryTableOutput data={agentInventory} totalIngredients={agentIngredientRequirement.total}/>
                          </TabsContent>
                          <TabsContent value="sales" className='pb-10'>
                            <SalesTable data={agentSales} />
                          </TabsContent>
                        </Tabs>
              </div>
          </div>
        </DialogContent>
      </Dialog>
        }
    </div>
  )
}

export default AgentOutput;
