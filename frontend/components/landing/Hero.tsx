'use client';

export function Hero() {
  return (
    <section id="home" className="relative pt-40 pb-16 overflow-hidden">
      {/* Abstract Background Gradients exactly like the image */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-fuchsia-200/60 via-purple-100/30 to-transparent -z-10 blur-3xl pointer-events-none"></div>

      <div className="max-w-[800px] mx-auto px-6 text-center relative z-10">
        
        <h1 className="text-[52px] md:text-[64px] font-bold tracking-tight text-bordup-dark mb-6 leading-[1.1] font-sans">
          Effortless Task Management <br className="hidden md:block"/>
          for Teams and Individuals
        </h1>
        
        <p className="text-lg text-gray-600 mb-10 max-w-[600px] mx-auto leading-relaxed">
          Our service caters to both teams and individuals, ensuring everyone can stay organized and focused.
        </p>

        <div className="max-w-[400px] mx-auto relative group">
          <input 
            type="email" 
            placeholder="Enter your email" 
            className="w-full h-[60px] pl-6 pr-32 rounded-full border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-bordup-dark/10 focus:border-gray-300 text-bordup-dark"
          />
          <button className="absolute right-2 top-2 h-[44px] px-5 bg-bordup-dark text-white rounded-full text-sm font-semibold flex items-center justify-center transition-transform hover:scale-105">
            Try Free
            <div className="ml-2 w-6 h-6 bg-white rounded-full flex items-center justify-center">
              <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                 <path d="M1 6H11M11 6L6 1M11 6L6 11" stroke="#161616" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </button>
        </div>

      </div>
    </section>
  );
}
