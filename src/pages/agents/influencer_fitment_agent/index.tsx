import { ArrowLeftIcon} from 'lucide-react';
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { InfluencersTable } from './components/InfluencersTable'
import { CampaignsTable } from './components/CampaignsTable';
import AgentOutput from './components/AgentOutput';

const InfluencerFitmentAgent = () => {

    const [loading, setLoading] = useState<boolean>(true);
    const [campaigns, setCampaigns] = useState<any>([]);
    const [influencers, setInfluencers] = useState<any>([]);

    useEffect(() => {
        setLoading(true);
      
        Promise.all([
          fetch("https://influencerfitmentagent-462434048008.asia-south1.run.app/input/influencers")
            .then(res => res.json()),
          fetch("https://influencerfitmentagent-462434048008.asia-south1.run.app/input/campaigns")
            .then(res => res.json())
        ])
        .then(([influencersData, campaignsData]) => {
          console.log(campaignsData?.data);
          console.log(influencersData?.data)
          setCampaigns(campaignsData?.data);
          setInfluencers(influencersData?.data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
      
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
          <h2>Influencer Fitment Agent</h2>
          <span></span>
        </div>
      </div>

      <div className='container mx-auto mt-5'>
        <Tabs defaultValue="influencers" className="w-full" >
          <div className='flex justify-between items-center'>
            <TabsList className='w-fit'>
              <TabsTrigger value="influencers" className='w-fit bg-white'>Influencers</TabsTrigger>
              <TabsTrigger value="campaigns" className='w-fit bg-white'>Campaigns</TabsTrigger>
            </TabsList>
            <AgentOutput />
          </div>
           
          <TabsContent value="influencers" className='pb-10'>
            <InfluencersTable data={influencers} />
          </TabsContent>
          <TabsContent value="campaigns" className='pb-10'>
            <CampaignsTable data={campaigns} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
export default InfluencerFitmentAgent