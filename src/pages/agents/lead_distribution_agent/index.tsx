import { useEffect } from 'react'
import { ArrowLeftIcon} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LeadTable } from './components/LeadTable';
import { RepsTable } from './components/RepsTable';
import AgentOutput from './components/AgentOutput';
import { fetchLeadDistributionInitialData } from '@/features/lead_distribution/leadDistributionThunks';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/app/store';


const LeadDistributionAgent = () => {
  
  const dispatch = useDispatch<AppDispatch>()
  const { leads, reps, loading, isFetched } = useSelector(
  (state: RootState) => state.leadDistribution
)

useEffect(() => {
  if (!isFetched) {
    dispatch(fetchLeadDistributionInitialData())
  }
}, [dispatch, isFetched])
  
    return (
      <div className='h-full bg-white'>
        {loading && (
          <div className="absolute h-full w-full inset-0 z-10 bg-gray-200/50 flex items-center justify-center">
            <div className="loader"></div>
          </div>
        )}
  
        <div className="bg-[#83b2ce]">
          <div className='container text-white py-5 text-center font-bold text-xl flex items-center justify-between'>
            <Link to="/" className='group text-white hover:bg-white p-2 rounded-full transition-all duration-300'>
              <ArrowLeftIcon className='w-6 h-6 group-hover:text-[#83b2ce]' />
            </Link>
            <h2>Lead Distribution Agent</h2>
            <span></span>
          </div>
        </div>
  
        <div className='container mx-auto mt-5'>
          <Tabs defaultValue="leads" className="w-full ">
            <div className='flex justify-between items-center'>
              <TabsList className='w-fit'>
                <TabsTrigger value="leads" className='w-fit bg-white'>Leads</TabsTrigger>
                <TabsTrigger value="reps" className='w-fit bg-white'>Reps</TabsTrigger>
              </TabsList>
              <AgentOutput />
            </div>
             
            <TabsContent value="leads" className='pb-10'>
              <LeadTable data={leads} />
            </TabsContent>
            <TabsContent value="reps" className='pb-10'>
              <RepsTable data={reps} />
            </TabsContent>
            
          </Tabs>
        </div>
      </div>
    )
}

export default LeadDistributionAgent