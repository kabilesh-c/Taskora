import { RegisterForm } from '@/components/auth/RegisterForm';

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen bg-background">
      {/* Left Decorative Panel */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-dark-bg overflow-hidden items-center justify-center p-12">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/40 z-0"></div>
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-indigo-900/40 via-transparent to-transparent"></div>
        
        <div className="relative z-10 w-full max-w-lg">
          <div className="text-white mb-10 text-center">
            <h2 className="text-4xl font-bold mb-4 font-sans tracking-tight">Join 2,400+ Agencies</h2>
            <p className="text-gray-300 text-lg text-balance">The only tool built specifically for the chaos of digital marketing workflows.</p>
          </div>
          
          {/* Testimonial mock */}
          <div className="mt-12 bg-white/5 p-6 rounded-2xl border border-white/10 backdrop-blur-sm animate-float-slow">
            <div className="flex items-center gap-1 mb-4 text-amber-400">
              {'★★★★★'.split('').map((star, i) => <span key={i}>{star}</span>)}
            </div>
            <p className="text-white/90 text-lg mb-4 leading-relaxed">
              &quot;TaskFlow transformed our team&apos;s output. We spend less time tracking who is doing what, and more time actually delivering for clients.&quot;
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center font-bold text-white">AM</div>
              <div>
                <h5 className="text-white font-medium">Arjun M.</h5>
                <p className="text-gray-400 text-sm">Digital Strategist, Weboin</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Form Panel */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 lg:p-16">
        <div className="w-full max-w-md mx-auto">
          {/* Mobile Logo */}
          <div className="lg:hidden mb-8 text-center flex items-center justify-center">
            <div className="w-8 h-8 rounded-lg bg-primary mr-2 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5 text-white">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
              </svg>
            </div>
            <span className="text-xl font-bold tracking-tight text-text-primary">TaskFlow</span>
          </div>
          
          <RegisterForm />
        </div>
      </div>
    </div>
  );
}
