/* eslint-disable @typescript-eslint/no-explicit-any */
import { ArrowLeftIcon } from 'lucide-react';
import { useEffect } from 'react'
import { Link } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProductTable } from './components/ProductTable';
import { CustomerTable } from './components/CustomerTable';
import { PolicyTable } from './components/PolicyTable';
import AgentOutput from './components/AgentOutput';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/app/store';
import { fetchReturnFraudInitialData } from '@/features/returns_fraud/returnsFraudThunks';

const ReturnsFraudPrevention = () => {

  const dispatch = useDispatch<AppDispatch>()
  const { customers, products, policies, loading ,isFetched } = useSelector((state: RootState) => state.returnFraud)
 
  useEffect(() => {
    if (!isFetched) {
      dispatch(fetchReturnFraudInitialData())
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
          <h2>Return Fraud Prevention</h2>
          <span></span>
        </div>
      </div>

      <div className='container mx-auto mt-5'>
        <Tabs defaultValue="customer" className="w-full ">
          <div className='flex justify-between items-center'>
            <TabsList className='w-fit'>
              <TabsTrigger value="customer" className='w-fit bg-white'>Customer</TabsTrigger>
              <TabsTrigger value="product" className='w-fit bg-white'>Product</TabsTrigger>
              <TabsTrigger value="policies" className='w-fit bg-white'>Policies</TabsTrigger>
            </TabsList>
            <AgentOutput />
          </div>
           
          <TabsContent value="customer" className='pb-10'>
            <CustomerTable data={customers} />
          </TabsContent>
          <TabsContent value="product" className='pb-10'>
            <ProductTable data={products} />
          </TabsContent>
          <TabsContent value="policies" className='pb-10'>
            <PolicyTable data={policies} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default ReturnsFraudPrevention;