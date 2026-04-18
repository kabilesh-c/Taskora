'use client';

import Link from 'next/link';

export function Navbar() {
  return (
    <nav className="w-full absolute top-0 left-0 right-0 z-50 pt-6">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8 flex items-center justify-between">
        
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-bordup-dark flex items-center justify-center">
            <div className="w-3 h-3 rounded-full border-[2px] border-white relative top-[-1px]"></div>
          </div>
          <span className="font-bold text-xl tracking-tight text-bordup-dark">TaskFlow</span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-10">
          <Link href="#home" className="text-sm font-semibold text-bordup-dark">Home</Link>
          <Link href="#product" className="text-sm font-medium text-gray-500 hover:text-bordup-dark transition-colors">Product</Link>
          <Link href="#review" className="text-sm font-medium text-gray-500 hover:text-bordup-dark transition-colors">Review</Link>
          <Link href="#pricing" className="text-sm font-medium text-gray-500 hover:text-bordup-dark transition-colors">Pricing</Link>
          <Link href="#awards" className="text-sm font-medium text-gray-500 hover:text-bordup-dark transition-colors">Awards</Link>
        </div>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center gap-6">
          <Link href="/login" className="text-sm font-bold text-bordup-dark">
            Sign In
          </Link>
          <Link href="/register">
            <div className="h-10 pl-5 pr-1.5 inline-flex items-center justify-center rounded-full bg-bordup-dark text-white font-medium hover:bg-black transition-colors cursor-pointer group">
              <span className="text-sm mr-2">Signup Free</span>
              <div className="w-7 h-7 bg-white rounded-full flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
                <svg width="10" height="10" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 6H11M11 6L6 1M11 6L6 11" stroke="#161616" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </Link>
        </div>

      </div>
    </nav>
  );
}
