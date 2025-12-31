/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CustomerTableOutput } from './CustomerTableOutput';
import { ProductTableOutput } from './ProductTableOutput';

const AgentOutput = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [customers, setCustomers] = useState<any>(null);
    const [products, setProducts] = useState<any>(null);
    const handleOutput = () => {
        setLoading(true);
        fetch("https://abuse-return-detection-agent-462434048008.asia-south1.run.app/run", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        })
        .then((response) => response.json())
        .then((data) => {
            setCustomers(data?.high_risk_customers);
            setProducts(data?.high_risk_products);
            setLoading(false);
        })
        .catch((error) => {
            console.error("Error fetching output data:", error);
            setLoading(false);
        });
    }
  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <Button onClick={handleOutput}>Agent</Button>
        </DialogTrigger>
        <DialogContent className="max-w-[95vw] sm:max-w-[95vw] w-full h-[90vh] flex flex-col bg-white overflow-auto">
          <DialogHeader>
            <DialogTitle>Results</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <div>
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="loader"></div>
              </div>
            ) : (
              <div className='container mx-auto mt-5'>
                <Tabs defaultValue="customer" className="w-full ">
                  <TabsList className='w-full'>
                    <TabsTrigger value="customer" className='w-full bg-white'>Customer</TabsTrigger>
                    <TabsTrigger value="product" className='w-full bg-white'>Product</TabsTrigger>
                  </TabsList>
                    
                  <TabsContent value="customer" className='pb-10'>
                    <CustomerTableOutput data={customers} />
                  </TabsContent>
                  <TabsContent value="product" className='pb-10'>
                    <ProductTableOutput data={products} />
                  </TabsContent>
                </Tabs>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default AgentOutput;
