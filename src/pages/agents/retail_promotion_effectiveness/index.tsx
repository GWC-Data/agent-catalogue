import { useEffect } from 'react'
import { ArrowLeftIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/app/store';
import { retailPromotionThunks } from '@/features/Retail_promotion_effectiveness/retailPromotionThunks';
import { HistoricalPromotionsTable } from './components/HistoricalPromotionsTable';
import { LivePromotionsTable } from './components/LivePromotionsTable';
import AgentOutput from './components/AgentOutput';

const RetailPromotionEffectiveness = () => {

    const dispatch = useDispatch<AppDispatch>()

    const { historicalPromotions, livePromotions, loading, isFetched } =
        useSelector((state: RootState) => state.retailPromotion)

    useEffect(() => {
        if (!isFetched) {
        dispatch(retailPromotionThunks())
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
          <h2>Retail Promotion Effectiveness</h2>
          <span></span>
        </div>
      </div>

      <div className='container mx-auto mt-5'>
        <Tabs defaultValue="historicalPromotions" className="w-full ">
          <div className='flex justify-between items-center'>
            <TabsList className='w-fit'>
              <TabsTrigger value="historicalPromotions" className='w-fit bg-white'>Historical Promotions</TabsTrigger>
              <TabsTrigger value="livePromotions" className='w-fit bg-white'>Live Promotions</TabsTrigger>
            </TabsList>
            <AgentOutput />
          </div>
           
          <TabsContent value="historicalPromotions" className='pb-10'>
            <HistoricalPromotionsTable data={historicalPromotions} />
          </TabsContent>
          <TabsContent value="livePromotions" className='pb-10'>
            <LivePromotionsTable data={livePromotions} />
          </TabsContent>
          
        </Tabs>
      </div>
    </div>
  )
}

export default RetailPromotionEffectiveness