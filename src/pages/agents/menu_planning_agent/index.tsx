import React, { useEffect, useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/app/store';
import { Link } from 'react-router-dom';
import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react';
import { fetchMenuPlanningData } from '@/features/menu_planning/menuPlanningThunks';
import { VendorTable } from './components/VendorTable';
import { SalesTable } from './components/SalesTable';
import { InventoryTable } from './components/InventoryTable';
import { CircleCheckBig } from 'lucide-react';
import AgentOutput from './components/AgentOutput';
import { RecipesCard } from './components/RecipesCard';

const MenuPlanningAgent = () => {

    const dispatch = useDispatch<AppDispatch>()
    const { sales, dishes , inventory, vendor, recipes, loading, isFetched } = useSelector(
        (state: RootState) => state.menuPlanning
    ) 
    
    useEffect(() => {
        if (!isFetched) {
          dispatch(fetchMenuPlanningData())
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
          <h2>Menu Planning Agent</h2>
          <span></span>
        </div>
      </div>

      {/* ✅ Daily Dishes Display */}
      <div className="container mx-auto mt-4">
  <div className="rounded-lg p-4 flex flex-wrap gap-3 items-center">

    <span className="text-gray-700 font-semibold ">
      Dishes Available
    </span>
    <ArrowRightIcon className='w-4 h-4 group-hover:text-[#83b2ce]' />
    {dishes.map((dish, index) => (
      <div
        key={index}
        className="flex items-center gap-2 bg-[#2f9e44] text-white px-3 py-1.5 rounded-md text-sm font-medium shadow"
      >
        <CircleCheckBig className="w-4 h-4 text-white" />
        {dish}
      </div>
    ))}
  </div>
</div>
    
      <div className='container mx-auto mt-5'>
        <Tabs defaultValue="recipes" className="w-full" >
          <div className='flex justify-between items-center'>
            <TabsList className='w-fit'>
              <TabsTrigger value="recipes" className='w-fit bg-white'>Recipes</TabsTrigger>
              <TabsTrigger value="vendors" className='w-fit bg-white'>Vendors</TabsTrigger>
              <TabsTrigger value="inventory" className='w-fit bg-white'>Inventory</TabsTrigger>
              <TabsTrigger value="sales" className='w-fit bg-white'>Sales</TabsTrigger>
            </TabsList>
            <AgentOutput />
          </div>
           
          <TabsContent value="recipes" className='pb-10'>
            <RecipesCard data={recipes} />
          </TabsContent>
          <TabsContent value="vendors" className='pb-10'>
            <VendorTable data={vendor} />
          </TabsContent>
          <TabsContent value="inventory" className='pb-10'>
            <InventoryTable data={inventory} />
          </TabsContent>
          <TabsContent value="sales" className='pb-10'>
            <SalesTable data={sales} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default MenuPlanningAgent