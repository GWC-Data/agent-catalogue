import chairImage from "@/assets/header.png";
import logo from "@/assets/light-logo.svg";

const HeroSection = () => {
  return (
    <section className="w-full min-h-[100vh] bg-poster-cream relative overflow-hidden flex flex-col justify-center">
      
      {/* Main Content Container - Grid for Desktop */}
      <div className="container mx-auto px-4 lg:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* Left Visual Area */}
          <div className="relative w-full lg:w-[50%]">
            {/* The Blue Background Shape */}
            <div className="absolute -left-[100%] right-0 top-[-200px] bottom-[-200px] bg-[#6f2b8b] rounded-br-[250px] z-0 w-[200%]"></div>
            
            {/* Decorative Gold Square Top */}
            <div className="absolute top-[-30px] left-1/2 -translate-x-1/2 w-20 h-20 bg-poster-gold z-0"></div>

            {/* The White Image Card */}
            <div className="relative bg-white w-full max-w-[400px] aspect-[4/5] mx-auto p-8 shadow-2xl z-10 flex items-center justify-center">
               <img 
                 src={chairImage} 
                 alt="Modern chair" 
                 className="w-full h-full object-contain"
               />
            </div>

            {/* Dots decoration - Bottom Left of the Blue Shape */}
            <div className="absolute bottom-[-50px] left-[-40px] z-20">
              <div className="grid grid-cols-2 gap-2">
                 <div className="w-3 h-3 bg-poster-gold rounded-full"></div>
                 <div className="w-3 h-3 bg-poster-gold rounded-full"></div>
                 <div className="w-3 h-3 bg-poster-gold rounded-full"></div>
                 <div className="w-3 h-3 bg-poster-gold rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Right Content Area */}
          <div className="w-full lg:w-[50%] pt-10 lg:pt-0 pl-0 lg:pl-10 text-center lg:text-left">
             <div className="mb-8">
               <h1 className="font-sans font-bold text-poster-gold text-[70px] lg:text-[100px] leading-[0.9] tracking-tight">
                 AI<br/>AGENTS
               </h1>
             </div>

             <div className="space-y-6 max-w-lg mx-auto lg:mx-0">
               <p className="font-serif italic text-poster-blue text-2xl leading- snug">
                 Smart, scalable AI agents for real-world business automation.
               </p>

               <p className="text-base text-muted-foreground leading-relaxed">
                 Our AI Agents automate complex workflows, enhance decision-making, and integrate seamlessly with your tools. With 35+ specialized agents, we help businesses operate faster, smarter, and more efficiently.
               </p>
             </div>
          </div>

        </div>
      </div>

      {/* Header/Nav overlay - Keep it minimal as per reference */}
      <div className="absolute top-0 right-0 p-6 z-20">
        <img src={logo} alt="logo" className="w-40 h-20" />
      </div>

    </section>
  );
};

export default HeroSection;
