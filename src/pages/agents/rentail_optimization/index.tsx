import { ArrowLeftIcon} from 'lucide-react';
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { VendorPriceTable } from './components/VendorPriceTable';
import { ProductTable } from './components/ProductTable';
import AgentOutput from './components/AgentOutput';
import { AppDispatch, RootState } from '@/app/store';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRetailOptimizationInitialData } from '@/features/retail_optimization/retailOptimizationThunks';

const RetailOptimization = () => {

  const dispatch = useDispatch<AppDispatch>()
  const { vendorPrices, products, isFetched, loading } = useSelector(
  (state: RootState) => state.retailOptimization
)

useEffect(() => {
  if (!isFetched) {
    dispatch(fetchRetailOptimizationInitialData())
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
          <h2>Retail Optimization</h2>
          <span></span>
        </div>
      </div>

      <div className='container mx-auto mt-5'>
        <Tabs defaultValue="product" className="w-full" >
          <div className='flex justify-between items-center'>
            <TabsList className='w-fit'>
              <TabsTrigger value="product" className='w-fit bg-white'>Product</TabsTrigger>
              <TabsTrigger value="vendorPrice" className='w-fit bg-white'>Vendor Price</TabsTrigger>
            </TabsList>
            <AgentOutput />
          </div>
           
          <TabsContent value="product" className='pb-10'>
            <ProductTable data={products} />
          </TabsContent>
          <TabsContent value="vendorPrice" className='pb-10'>
            <VendorPriceTable data={vendorPrices} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
export default RetailOptimization