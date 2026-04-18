import Link from 'next/link';

export function Footer() {
  return (
    <footer className="px-6 lg:px-8 max-w-[1280px] mx-auto pb-12">
      <div className="bg-[#242424] rounded-[48px] p-10 md:p-16 flex flex-col pt-16">
        
        {/* Top CTA Section inside the footer block */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-16 border-b border-gray-600/50 mb-16">
          <h2 className="text-[32px] md:text-[40px] font-bold text-white leading-tight max-w-[350px]">
            Ready to boost your productivity ?
          </h2>
          
          <div className="w-full md:w-auto relative group">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="w-full md:w-[350px] h-[60px] pl-6 pr-32 rounded-full border-none focus:outline-none text-bordup-dark cursor-target"
            />
            <button className="absolute right-2 top-2 h-[44px] px-5 bg-bordup-dark text-white rounded-full text-sm font-semibold flex items-center justify-center transition-transform hover:bg-[#111] cursor-target">
              Try Free
              <div className="ml-2 w-6 h-6 bg-white rounded-full flex items-center justify-center">
                <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                   <path d="M1 6H11M11 6L6 1M11 6L6 11" stroke="#161616" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </button>
          </div>
        </div>

        {/* Bottom Footer Links Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-gray-400 text-sm pb-10">
          
          {/* Logo & Description */}
          <div className="col-span-1 md:col-span-2 max-w-xs">
            <div className="flex items-center gap-2 mb-6 text-white">
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
                <div className="w-3 h-3 rounded-full border-[2px] border-bordup-dark relative top-[-1px]"></div>
              </div>
              <span className="font-bold text-xl tracking-tight">Bordup</span>
            </div>
            <p className="text-xs leading-relaxed mb-10 text-gray-500 font-medium w-[80%]">
              Designed to help teams and individuals stay organized, focused, and on track.
            </p>
            
            {/* Social Icons */}
            <div className="flex gap-4">
              <Link href="#" className="w-8 h-8 rounded-full bg-[#333] flex items-center justify-center hover:bg-white hover:text-bordup-dark transition-colors">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
              </Link>
              <Link href="#" className="w-8 h-8 rounded-full bg-[#333] flex items-center justify-center hover:bg-white hover:text-bordup-dark transition-colors">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
              </Link>
              <Link href="#" className="w-8 h-8 rounded-full bg-[#333] flex items-center justify-center hover:bg-white hover:text-bordup-dark transition-colors text-lg font-bold font-serif leading-none">
                𝕏
              </Link>
            </div>
          </div>

          {/* Links Block 1 */}
          <div>
            <h4 className="text-white font-semibold mb-6">Home</h4>
            <ul className="space-y-4">
              <li><Link href="#about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="#personal" className="hover:text-white transition-colors">Personal</Link></li>
              <li><Link href="#business" className="hover:text-white transition-colors">Business</Link></li>
            </ul>
          </div>

          {/* Links Block 2 */}
          <div>
            <h4 className="text-white font-semibold mb-6">Features</h4>
            <ul className="space-y-4">
              <li><Link href="#get-started" className="hover:text-white transition-colors">Get Started</Link></li>
              <li><Link href="#privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="#terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
            </ul>
          </div>

        </div>

      </div>
    </footer>
  );
}
