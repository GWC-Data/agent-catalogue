/* eslint-disable @typescript-eslint/no-explicit-any */
import { ArrowLeftIcon } from 'lucide-react';
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from 'react';
import { ProductTable } from './components/ProductTable';
import { CustomerTable } from './components/CustomerTable';
import { PolicyTable } from './components/PolicyTable';

const ReturnsFraudPrevention = () => {

  const [customer, setCustomer] = useState<any>([]);
  const [product, setProduct] = useState<any>([]);
  const [policies, setPolicies] = useState<any>([]);

  useEffect(() => {
    fetch("https://abuse-return-detection-agent-462434048008.asia-south1.run.app/input/customer_data")
      .then((response) => response.json())
      .then((data) => setCustomer(data?.customer_data?.customers))
      .catch((error) => console.log(error));

    fetch("https://abuse-return-detection-agent-462434048008.asia-south1.run.app/input/product_data")
      .then((response) => response.json())
      .then((data) => setProduct(data?.product_data?.products))
      .catch((error) => console.log(error));

    fetch("https://abuse-return-detection-agent-462434048008.asia-south1.run.app/policies")
      .then((response) => response.json())
      .then((data) => setPolicies(data?.policies?.policies))
      .catch((error) => console.log(error));
  }, []);

  console.log(customer, product, policies);

  return (
    <div>
      <div className='bg-[#6f2b8b] text-white py-5 px-6 text-center font-bold text-xl flex items-center justify-between'>
        <Link to="/" className='group text-white hover:bg-white p-2 rounded-full transition-all duration-300'>
          <ArrowLeftIcon className='w-6 h-6 group-hover:text-[#6f2b8b]' />
        </Link>
        <h2>Return Fraud Prevention</h2>
        <span></span>
      </div>
      <div className='container mx-auto mt-10'>
        <Tabs defaultValue="customer" className="w-full ">
          <TabsList className='w-full'>
            <TabsTrigger value="customer" className='w-full bg-white'>Customer</TabsTrigger>
            <TabsTrigger value="product" className='w-full bg-white'>Product</TabsTrigger>
            <TabsTrigger value="policies" className='w-full bg-white'>Policies</TabsTrigger>
          </TabsList>
          <TabsContent value="customer">
            <CustomerTable data={customer} />
          </TabsContent>
          <TabsContent value="product">
            <ProductTable data={product} />
          </TabsContent>
          <TabsContent value="policies">
            <PolicyTable data={policies} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default ReturnsFraudPrevention;