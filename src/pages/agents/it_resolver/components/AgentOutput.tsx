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
import { runITResolverAgent } from '@/features/it_resolver/itResolverAgentThunks';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/app/store';
import { TicketsCard } from './TicketsCard';

const AgentOutput = () => {
  const { toast } = useToast()
  const dispatch = useDispatch<AppDispatch>()

  const { agentOutput, agentLoading } = useSelector(
    (state: RootState) => state.itResolver
  )
  
  const handleOutput = async () => {
    try {
      await dispatch(runITResolverAgent()).unwrap()
  
      toast({
        title: "Success",
        description: "Agent data fetched successfully",
        className: "bg-green-600 text-white border-green-700",
      })
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error || "Something went wrong",
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
          <div>
            {agentLoading ? (
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
                    <TicketsCard tickets={agentOutput} />
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
