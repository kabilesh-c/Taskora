import { LoginForm } from '@/components/auth/LoginForm';
import { Card } from '@/components/ui/Card';

export default function LoginPage() {
  return (
    <div className="flex min-h-screen bg-background">
      {/* Left Decorative Panel */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-dark-bg overflow-hidden items-center justify-center p-12">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 z-0"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-indigo-900/40 via-transparent to-transparent"></div>
        
        <div className="relative z-10 w-full max-w-lg space-y-6">
          <div className="text-white mb-10">
            <h2 className="text-4xl font-bold mb-4 font-sans tracking-tight">Manage less.<br/>Achieve more.</h2>
            <p className="text-gray-300 text-lg text-balance">TaskFlow empowers top agencies to track deliverables without the administrative chaos.</p>
          </div>
          
          {/* Floating mock cards */}
          <div className="space-y-4 animate-float-slow">
            <div className="bg-dark-panel p-4 rounded-xl border border-white/10 shadow-2xl backdrop-blur-sm opacity-90 transform -rotate-2">
              <div className="flex justify-between items-start mb-2">
                <span className="px-2 py-1 bg-amber-500/20 text-amber-300 text-xs rounded-md font-medium">Urgent</span>
                <span className="text-gray-400 text-xs">Today</span>
              </div>
              <h4 className="text-white font-medium">SEO Audit — TechCorp Client</h4>
            </div>
            
            <div className="bg-dark-panel p-4 rounded-xl border border-white/10 shadow-2xl backdrop-blur-sm opacity-80 transform translate-x-4 rotate-1 lg:ml-8">
              <div className="flex justify-between items-start mb-2">
                <span className="px-2 py-1 bg-emerald-500/20 text-emerald-300 text-xs rounded-md font-medium">Completed</span>
                <span className="text-gray-400 text-xs">Yesterday</span>
              </div>
              <h4 className="text-white font-medium text-opacity-70 line-through">Google Ads Campaign Q2</h4>
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
          
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
