/* eslint-disable @typescript-eslint/no-explicit-any */
import { ArrowLeftIcon } from 'lucide-react';
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from 'react';
import { ProductTable } from './components/ProductTable';
import { CustomerTable } from './components/CustomerTable';
import { PolicyTable } from './components/PolicyTable';
import AgentOutput from './components/AgentOutput';

const ReturnsFraudPrevention = () => {

  const [loading, setLoading] = useState<boolean>(true);
  const [customer, setCustomer] = useState<any>([]);
  const [product, setProduct] = useState<any>([]);
  const [policies, setPolicies] = useState<any>([]);

  useEffect(() => {
    setLoading(true);
    fetch("https://abuse-return-detection-agent-462434048008.asia-south1.run.app/input/customer_data")
      .then((response) => response.json())
      .then((data) => {
        setCustomer(data?.customer_data?.customers)
        setLoading(false);
      })
      .catch((error) => {
        console.log(error)
        setLoading(false);
  });

    fetch("https://abuse-return-detection-agent-462434048008.asia-south1.run.app/input/product_data")
      .then((response) => response.json())
      .then((data) => { 
        setProduct(data?.product_data?.products)
        setLoading(false);
    })
    .catch((error) => {
      console.log(error)
      setLoading(false);
    });

    fetch("https://abuse-return-detection-agent-462434048008.asia-south1.run.app/policies")
      .then((response) => response.json())
      .then((data) => { 
        setPolicies(data?.policies?.policies)
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
            <CustomerTable data={customer} />
          </TabsContent>
          <TabsContent value="product" className='pb-10'>
            <ProductTable data={product} />
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