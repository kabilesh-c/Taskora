import Image from 'next/image';

export function DarkFeatureBlock() {
  return (
    <section className="px-6 lg:px-8 mb-16 max-w-[1280px] mx-auto">
      <div className="w-full bg-bordup-dark rounded-[32px] p-8 md:p-12 lg:p-16 flex flex-col md:flex-row items-center justify-between gap-12 relative overflow-hidden group">
        
        {/* Background diagonal dark stripes matching reference image */}
        <div className="absolute right-0 bottom-0 w-1/3 h-full opacity-20 pointer-events-none transition-opacity group-hover:opacity-40 duration-700">
           <div className="w-48 h-full bg-gray-600 rotate-45 transform origin-bottom-right scale-150 rounded-full blur-xl absolute -right-10 bottom-0"></div>
           <div className="w-32 h-full bg-gray-600 rotate-45 transform origin-bottom-right scale-150 rounded-full blur-xl absolute -right-40 bottom-10"></div>
        </div>

        {/* Left Side: High Fidelity Generated Image */}
        <div className="w-full md:w-[55%] relative h-[300px] md:h-[400px] flex items-center justify-center rounded-2xl overflow-hidden shadow-2xl border border-white/10 group-hover:scale-[1.01] transition-transform duration-500">
           <Image 
             src="/dark-analytics.png" 
             alt="Dark Analytics Dashboard" 
             fill
             className="object-cover"
           />
        </div>

        {/* Right Text Content Side */}
        <div className="w-full md:w-[45%] relative z-10 lg:pl-10">
          <h2 className="text-3xl md:text-[40px] font-bold text-white leading-tight mb-5 tracking-tight group-hover:text-fuchsia-100 transition-colors">
            Track real-time progress with Reports
          </h2>
          <p className="text-gray-400 text-base mb-8 max-w-[400px]">
            Get valuable insights into your productivity and project status with our real-time reporting features.
          </p>
          <button className="h-[44px] pl-6 pr-1.5 bg-white text-bordup-dark rounded-full text-sm font-bold inline-flex items-center justify-center hover:bg-gray-100 transition-transform cursor-target hover:scale-[1.02] active:scale-95 group/btn">
            Get Started
            <div className="ml-3 w-8 h-8 bg-bordup-dark rounded-full flex items-center justify-center group-hover/btn:translate-x-0.5 transition-transform">
              <svg width="10" height="10" viewBox="0 0 12 12" fill="none" className="rotate-0 text-white">
                 <path d="M1 6H11M11 6L6 1M11 6L6 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </button>
        </div>

      </div>
    </section>
  );
}
