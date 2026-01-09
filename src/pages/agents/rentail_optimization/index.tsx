import { ArrowLeftIcon} from 'lucide-react';
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { VendorPriceTable } from './components/VendorPriceTable';
import { ProductTable } from './components/ProductTable';
import { formatVendorPricing } from "./utils/formatVendorPricing";
import type { VendorPriceRow } from "./utils/formatVendorPricing";
import AgentOutput from './components/AgentOutput';

const RetailOptimization = () => {

    const [vendorPrice, setVendorPrice] = useState<VendorPriceRow[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [product, setProduct] = useState<any>([]);

    useEffect(() => {
        setLoading(true);
      
        Promise.all([
          fetch("https://aai-case-study-retail-optimization-462434048008.asia-south2.run.app/api/v1/input/products")
            .then(res => res.json()),
          fetch("https://aai-case-study-retail-optimization-462434048008.asia-south2.run.app/api/v1/input/vendors-prices")
            .then(res => res.json())
        ])
        .then(([productData, vendorData]) => {
          setProduct(productData);
          setVendorPrice(formatVendorPricing(vendorData.vendor_pricing));
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
            <ProductTable data={product} />
          </TabsContent>
          <TabsContent value="vendorPrice" className='pb-10'>
            <VendorPriceTable data={vendorPrice} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
export default RetailOptimization