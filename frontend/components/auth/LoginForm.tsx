'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Play } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Toast } from '@/components/ui/Toast';
import api from '@/lib/api';
import { useAuth } from '@/hooks/useAuth';

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const { login } = useAuth();

  const handleLogin = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!email || !password) {
      setToast({ message: 'Please enter both email and password', type: 'error' });
      return;
    }

    setIsLoading(true);
    try {
      const response = await api.post('/login', { email, password });
      const { access_token } = response.data;
      
      login(access_token, {
        id: '1', 
        email, 
        full_name: email.split('@')[0], 
        created_at: new Date().toISOString()
      });
      
      window.location.href = '/dashboard';
    } catch (error: any) {
      setToast({ 
        message: error.response?.data?.detail || 'Invalid email or password', 
        type: 'error' 
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    const demoEmail = process.env.NEXT_PUBLIC_DEMO_EMAIL || 'demo@weboin.com';
    const demoPassword = process.env.NEXT_PUBLIC_DEMO_PASSWORD || 'demo1234';
    
    setEmail(demoEmail);
    setPassword(demoPassword);
    
    // Trigger login logic directly
    setIsLoading(true);
    try {
      const response = await api.post('/login', { email: demoEmail, password: demoPassword });
      const { access_token } = response.data;
      
      login(access_token, {
        id: '1', 
        email: demoEmail, 
        full_name: 'Demo User', 
        created_at: new Date().toISOString()
      });
      
      window.location.href = '/dashboard';
    } catch (error: any) {
      setToast({ 
        message: error.response?.data?.detail || 'Demo login failed', 
        type: 'error' 
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold tracking-tight text-[#161616] mb-3">Welcome back</h1>
        <p className="text-gray-500 font-medium">Continue your high-performance journey.</p>
      </div>

      <form onSubmit={handleLogin} className="space-y-6">
        <Input
          label="Email address"
          type="email"
          placeholder="name@company.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="border-gray-200 focus-visible:ring-[#161616]/10 rounded-2xl h-[56px]"
        />
        
        <div className="space-y-2">
          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="border-gray-200 focus-visible:ring-[#161616]/10 rounded-2xl h-[56px]"
          />
          <div className="flex justify-between items-center text-xs px-1 font-bold">
            <label className="flex items-center space-x-2 cursor-pointer group">
              <input type="checkbox" className="rounded text-[#161616] focus:ring-[#161616] h-4 w-4 border-gray-300" />
              <span className="text-gray-400 group-hover:text-gray-600 transition-colors">Keep me active</span>
            </label>
            <a href="#" className="text-gray-400 hover:text-[#161616] transition-colors">Forgot key?</a>
          </div>
        </div>

        <Button 
          id="login-submit"
          type="submit" 
          className="w-full h-[60px] bg-[#161616] hover:bg-black text-white rounded-full font-bold text-base shadow-xl transition-all hover:scale-[1.02] active:scale-95 mt-4" 
          isLoading={isLoading}
        >
          Access Account
        </Button>
      </form>

      <div className="mt-10 pt-8 border-t border-gray-50">
        <div className="w-full bg-[#F9F6F0] rounded-3xl p-5 border border-gray-100 flex flex-col items-center text-center group cursor-pointer hover:bg-white hover:shadow-md transition-all" onClick={handleDemoLogin}>
          <p className="text-[11px] text-gray-400 mb-3 font-black uppercase tracking-widest">Rapid Exploration</p>
          <div className="flex items-center gap-3 text-[#161616] font-bold">
            <div className="w-8 h-8 rounded-full bg-[#161616] flex items-center justify-center text-white group-hover:scale-110 transition-transform">
               <Play size={12} className="fill-current ml-0.5" />
            </div>
            <span>One-Click Demo Access</span>
          </div>
        </div>
      </div>
    </div>
  );
}
