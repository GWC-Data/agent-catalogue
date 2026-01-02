/* eslint-disable @typescript-eslint/no-explicit-any */
import { ArrowLeftIcon } from 'lucide-react';
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from 'react';
import { CampaignTable } from './components/CampaignTable';
import AgentOutput from './components/AgentOutput';

const CampaignPerformance = () => {

  const [loading, setLoading] = useState<boolean>(true);
  const [campaign, setCampaign] = useState<any>([]);

  useEffect(() => {
    setLoading(true);
    fetch("https://campaign-performance-agent-462434048008.asia-south2.run.app/input/campaigns")
      .then((response) => response.json())
      .then((data) => {
        setCampaign(data?.campaigns_data)
        setLoading(false);
      })
      .catch((error) => {
        console.log(error)
        setLoading(false);
  });
  }, []);

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
          <h2>Campaign Performance</h2>
          <span></span>
        </div>
      </div>

      <div className='container mx-auto mt-5'>
        <Tabs defaultValue="campaign" className="w-full ">
          <div className='flex justify-between items-center'>
            <TabsList className='w-fit'>
              <TabsTrigger value="campaign" className='w-fit bg-white'>Campaign</TabsTrigger>
            </TabsList>
            <AgentOutput />
          </div>
           
          <TabsContent value="campaign" className='pb-10'>
            <CampaignTable data={campaign} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default CampaignPerformance;