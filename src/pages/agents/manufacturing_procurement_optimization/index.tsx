import { ArrowLeftIcon} from 'lucide-react';
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/app/store';
import { fetchManufacturingData } from '@/features/manufacturingThunks';
import { HistoricalSalesTable } from './components/HistoricalSalesTable';
import { VendorMasterTable } from './components/VendorMasterTable';
import AgentOutput from './components/AgentOutput';

const ManufacturingProcurementOptimization = () => {

    const dispatch = useDispatch<AppDispatch>()
    const { historicalSales, vendorMaster, loading, error, isFetched } = useSelector(
        (state: RootState) => state.manufacturing
    ) 
    console.log(vendorMaster)

    useEffect(() => {
        if (!isFetched) {
            dispatch(fetchManufacturingData())
          }
      }, [dispatch, isFetched]);
      
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
          <h2>Manufacturing Procurement Optimization</h2>
          <span></span>
        </div>
      </div>

      <div className='container mx-auto mt-5'>
        <Tabs defaultValue="historicalSales" className="w-full" >
          <div className='flex justify-between items-center'>
            <TabsList className='w-fit'>
              <TabsTrigger value="historicalSales" className='w-fit bg-white'>Historical Sales</TabsTrigger>
              <TabsTrigger value="vendorMaster" className='w-fit bg-white'>Vendor Master</TabsTrigger>
            </TabsList>
            <AgentOutput />
          </div>
           
          <TabsContent value="historicalSales" className='pb-10'>
            <HistoricalSalesTable data={historicalSales} />
          </TabsContent>
          <TabsContent value="vendorMaster" className='pb-10'>
            <VendorMasterTable data={vendorMaster} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
export default ManufacturingProcurementOptimization
