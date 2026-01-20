import { useEffect } from 'react'
import { ArrowLeftIcon} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AgentOutput from './components/AgentOutput';
import { InventoryTable } from './components/InventoryTable';
import { fetchInventoryDisposalInitialData } from '@/features/inventory_disposal/inventoryDisposalThunks';
import { AppDispatch, RootState } from '@/app/store';
import { useDispatch, useSelector } from 'react-redux';

const InventoryDisposalAgent = () => {
    
    const dispatch = useDispatch<AppDispatch>()
    const { inventoryData, loading, isFetched } = useSelector(
      (state: RootState) => state.inventoryDisposal
    )
    
    useEffect(() => {
      if (!isFetched) {
        dispatch(fetchInventoryDisposalInitialData())
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
          <h2>Inventory Disposal Agent</h2>
          <span></span>
        </div>
      </div>

      <div className='container mx-auto mt-5'>
        <Tabs defaultValue="inventory" className="w-full" >
          <div className='flex justify-between items-center'>
            <TabsList className='w-fit'>
              <TabsTrigger value="inventory" className='w-fit bg-white'>Inventory</TabsTrigger>
            </TabsList>
            <AgentOutput />
          </div>
          <TabsContent value="inventory" className='pb-10'>
            <InventoryTable data={inventoryData} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default InventoryDisposalAgent