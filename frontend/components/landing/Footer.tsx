import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-dark-panel text-gray-300 py-16 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-6 h-6 rounded bg-primary flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3 text-white">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                </svg>
              </div>
              <span className="font-bold text-lg text-white">TaskFlow</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
              Designed to help creative agencies and individuals stay organized, focused, and on track. Built specifically for modern marketing workflows.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6">Home</h4>
            <ul className="space-y-4 text-sm">
              <li><Link href="#" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Personal</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Business</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6">Features</h4>
            <ul className="space-y-4 text-sm">
              <li><Link href="#" className="hover:text-primary transition-colors">Get Started</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6">Social Media</h4>
            <ul className="space-y-4 text-sm">
              <li><Link href="#" className="hover:text-primary transition-colors">Instagram</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">LinkedIn</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Twitter (X)</Link></li>
            </ul>
          </div>
          
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>© 2025 TaskFlow by Weboin Technologies Private Limited. All rights reserved.</p>
          <div className="flex gap-4">
            <span className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 cursor-pointer transition-colors">f</span>
            <span className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 cursor-pointer transition-colors">in</span>
            <span className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 cursor-pointer transition-colors">𝕏</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
