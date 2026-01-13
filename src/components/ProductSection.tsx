import { useState } from "react";
import sofaImage from "@/assets/ai-agent.png";
import returns_fraud_prevention from "@/assets/returns_fraud_prevention.png";
import campaign_performance from "@/assets/campaign_performance.jpg";
import retail_optimization from "@/assets/retail_optimization.png"
import crm_engagement_optimization from "@/assets/crm_engagement_optimization.png"
import influencer_fitment_agent from "@/assets/influencer_fitment.png"
import inventory_disposal_agent from "@/assets/inventory_disposal_agent.png"
import lead_distribution_agent from "@/assets/lead_distribution_agent.png"
import manufacturing_procurement_optimization from "@/assets/manufacturing_procurement_optimization.png"

import { Link } from "react-router-dom";
import path from "path";
import ManufacturingProcurementOptimization from "@/pages/agents/manufacturing_procurement_optimization";

const ProductSection = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const products = [
    { image: returns_fraud_prevention, category: "", name: "Returns Fraud Prevention", path: "/returns_fraud_prevention" },
    { image: campaign_performance, category: "", name: "Campaign Performance", path: "/campaign_performance" },
    { image: retail_optimization, category: "", name: "Retail Optimization", path: "/retail_optimization" },
    { image: crm_engagement_optimization, category: "", name: "CRM Engagement Optimization", path: "/crm_engagament_optimization" },
    { image: influencer_fitment_agent, category: "", name: "Influencer Fitment Agent", path: "/influencer_fitment_agent" },
    { image: inventory_disposal_agent, category: "", name: "Inventory Disposal Agent", path: "/inventory_disposal_agent" },
    { image: lead_distribution_agent, category: "", name: "Lead Distribution Agent", path: "/lead_distribution_agent" },
    { image: manufacturing_procurement_optimization, category: "", name: "Manufacturing ProcurementO ptimization", path: "/manufacturing_procurement_optimization"}
  ];

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="w-full bg-card py-12 lg:py-16 px-6">
      <div className="container mx-auto max-w-6xl">
        {/* Main Feature Area */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-center mb-16">
          {/* Large Sofa Image */}
          <div className="w-full lg:w-1/2">
            <div className="relative aspect-[4/3] bg-gradient-to-br from-poster-blue-light/30 to-poster-cream rounded-2xl overflow-hidden shadow-lg group">
              <img 
                src={sofaImage} 
                alt="Living room with sofa" 
                className="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>

          {/* Content */}
          <div className="w-full lg:w-1/2 space-y-8">
            <div>
              <h2 className="font-serif italic text-poster-blue text-4xl lg:text-5xl leading-tight mb-4">
                Agentic AI <br/> Solutions
              </h2>
              <p className="text-muted-foreground leading-relaxed text-lg max-w-xl">
               Our Agentic AI solutions orchestrate intelligent workflows, adapt in real time, and integrate seamlessly with your systems to drive efficiency and business impact.
              </p>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="mt-24">
          <div className="text-center mb-12">
            <h3 className="font-serif text-3xl text-foreground mb-3">
              AI Agents
            </h3>
            <p className="text-muted-foreground mb-8">Discover intelligent agents designed to automate, optimize, and scale your workflows.</p>

            {/* Unique Search UI */}
            <div className="max-w-md mx-auto relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-muted-foreground group-focus-within:text-poster-gold transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search specifically..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white border-2 border-transparent focus:border-poster-gold/50 rounded-full shadow-[0_4px_14px_rgba(0,0,0,0.05)] focus:shadow-[0_6px_20px_rgba(234,179,8,0.15)] outline-none transition-all duration-300 text-foreground placeholder:text-muted-foreground/70"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 min-h-[400px]">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product, index) => (
                <Link to={product.path} key={index} className="group bg-white rounded-xl p-4 hover:shadow-xl transition-all duration-300 border hover:border-border animate-in fade-in zoom-in duration-500">
                  {/* Product image */}
                  <div className="w-full aspect-square bg-gradient-to-br from-poster-gray/30 to-card rounded-lg overflow-hidden mb-6 relative">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover p-4 group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  
                  {/* Product info */}
                  <div>
                    <p className="text-sm mb-1 text-poster-blue font-medium">{product.category}</p>
                    <h4 className="text-lg font-serif italic text-foreground mb-2 font-bold">
                      {product.name}
                    </h4>
                    {/* <div className="flex justify-between items-end">
                      <p className="text-sm text-muted-foreground leading-tight max-w-[70%]">
                        Lorem ipsum dolor sit amet, adipiscing sed diam.
                      </p>
                    </div> */}
                  </div>
                </Link>
              ))
            ) : (
              <div className="col-span-3 text-center py-20">
                <p className="text-muted-foreground text-lg">No agents found matching your search.</p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <div className="mt-20 pt-10 border-t border-border/50 text-center">
        <p className="text-poster-gold text-sm font-medium italic mb-2">
          Building intelligent AI agents that drive real business outcomes.
        </p>
        <p className="text-muted-foreground text-xs leading-relaxed max-w-2xl mx-auto">
          We design and deliver agentic AI solutions that automate workflows, enhance decision-making, and integrate seamlessly with modern business systems.
        </p>
      </div>
    </section>
  );
};

export default ProductSection;
