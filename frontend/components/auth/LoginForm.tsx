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
      
      // Store token early so we can fetch user details if needed, 
      // but here we just need to decode it or fetch profile.
      // Since our API login doesn't return user details in this scope, 
      // we'll store a mock user derived from token/email for demo purposes.
      login(access_token, {
        id: '1', 
        email, 
        full_name: email.split('@')[0], 
        created_at: new Date().toISOString()
      });
      
      // router push is handled by useAuth or layout if needed, 
      // but we do it explicitly here for safety
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

  const handleDemoLogin = () => {
    setEmail(process.env.NEXT_PUBLIC_DEMO_EMAIL || 'demo@weboin.com');
    setPassword(process.env.NEXT_PUBLIC_DEMO_PASSWORD || 'demo1234');
    // Using setTimeout to allow state to update before submitting
    setTimeout(() => {
      document.getElementById('login-submit')?.click();
    }, 100);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      
      <div className="mb-8 text-center sm:text-left">
        <h1 className="text-3xl font-bold tracking-tight text-text-primary mb-2">Welcome back</h1>
        <p className="text-text-secondary">Enter your details to access your account.</p>
      </div>

      <form onSubmit={handleLogin} className="space-y-5">
        <Input
          label="Email address"
          type="email"
          placeholder="name@agency.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        
        <div className="space-y-1">
          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="flex justify-between items-center text-sm px-1">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input type="checkbox" className="rounded text-primary focus:ring-primary h-4 w-4 border-gray-300" />
              <span className="text-text-secondary">Remember me</span>
            </label>
            <a href="#" className="font-medium text-primary hover:text-secondary">Forgot password?</a>
          </div>
        </div>

        <Button 
          id="login-submit"
          type="submit" 
          className="w-full mt-6" 
          isLoading={isLoading}
        >
          Sign In
        </Button>
      </form>

      <div className="mt-8 pt-8 border-t border-gray-100 flex flex-col gap-4">
        <div className="w-full bg-indigo-50 rounded-2xl p-4 border border-indigo-100 flex flex-col items-center text-center">
          <p className="text-sm text-indigo-900 mb-3 font-medium">Just looking around?</p>
          <Button 
            variant="secondary" 
            onClick={handleDemoLogin} 
            className="w-full"
          >
            <Play size={16} className="mr-2 fill-current" />
            Try Demo Mode
          </Button>
        </div>
        
        <p className="text-center text-sm text-text-secondary mt-2">
          Don&apos;t have an account?{' '}
          <Link href="/register" className="font-semibold text-primary hover:text-secondary transition-colors">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}
