import { useEffect } from 'react'
import { ArrowLeftIcon} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CampaignTable } from './components/CampaignTable';
import AgentOutput from './components/AgentOutput';
import { fetchCrmEngagementInitialData } from '@/features/crm_engagement/crmEngagementThunks';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/app/store';

const CrmEngagementOptimization = () => {

  const dispatch = useDispatch<AppDispatch>()
  const { campaigns, loading, isFetched } = useSelector(
  (state: RootState) => state.crmEngagement
)

useEffect(() => {
  if (!isFetched) {
    dispatch(fetchCrmEngagementInitialData())
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
          <h2>CRM Engagement Optimization</h2>
          <span></span>
        </div>
      </div>

      <div className='container mx-auto mt-5'>
        <Tabs defaultValue="product" className="w-full" >
          <div className='flex justify-between items-center'>
            <TabsList className='w-fit'>
              <TabsTrigger value="product" className='w-fit bg-white'>Campaign</TabsTrigger>
            </TabsList>
            <AgentOutput />
          </div>
          <TabsContent value="product" className='pb-10'>
            <CampaignTable data={campaigns} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default CrmEngagementOptimization