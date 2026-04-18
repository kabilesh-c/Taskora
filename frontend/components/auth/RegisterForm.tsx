'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Toast } from '@/components/ui/Toast';
import api from '@/lib/api';

export function RegisterForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      setToast({ message: 'Passwords do not match', type: 'error' });
      return;
    }
    
    if (formData.password.length < 8) {
      setToast({ message: 'Password must be at least 8 characters', type: 'error' });
      return;
    }

    setIsLoading(true);
    try {
      await api.post('/register', {
        full_name: formData.fullName,
        email: formData.email,
        password: formData.password
      });
      
      setToast({ message: 'Registration successful! Redirecting...', type: 'success' });
      
      setTimeout(() => {
        window.location.href = '/login';
      }, 1500);
      
    } catch (error: any) {
      setToast({ 
        message: error.response?.data?.detail || 'Failed to register account', 
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
        <h1 className="text-4xl font-extrabold tracking-tight text-[#161616] mb-3">Get Started</h1>
        <p className="text-gray-500 font-medium">Join the elite circle of high-performers.</p>
      </div>

      <form onSubmit={handleRegister} className="space-y-5">
        <Input
          label="Full Name"
          name="fullName"
          type="text"
          placeholder="John Doe"
          value={formData.fullName}
          onChange={handleChange}
          required
          className="border-gray-200 focus-visible:ring-[#161616]/10 rounded-2xl h-[52px]"
        />
        
        <Input
          label="Email address"
          name="email"
          type="email"
          placeholder="name@company.com"
          value={formData.email}
          onChange={handleChange}
          required
          className="border-gray-200 focus-visible:ring-[#161616]/10 rounded-2xl h-[52px]"
        />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Password"
            name="password"
            type="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
            required
            className="border-gray-200 focus-visible:ring-[#161616]/10 rounded-2xl h-[52px]"
          />
          
          <Input
            label="Confirm"
            name="confirmPassword"
            type="password"
            placeholder="••••••••"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            className="border-gray-200 focus-visible:ring-[#161616]/10 rounded-2xl h-[52px]"
          />
        </div>
        
        <div className="pt-2">
          <label className="flex items-start space-x-3 cursor-pointer group">
            <input type="checkbox" required className="mt-1 rounded text-[#161616] focus:ring-[#161616] h-4 w-4 border-gray-300" />
            <span className="text-[11px] text-gray-500 font-medium leading-tight">
              I agree to the <a href="#" className="font-bold text-[#161616] hover:underline">Terms of Service</a> and <a href="#" className="font-bold text-[#161616] hover:underline">Privacy Policy</a>.
            </span>
          </label>
        </div>

        <Button 
          type="submit" 
          className="w-full h-[60px] bg-[#161616] hover:bg-black text-white rounded-full font-bold text-base shadow-xl transition-all hover:scale-[1.02] active:scale-95 mt-4" 
          isLoading={isLoading}
        >
          Create Member Profile
        </Button>
      </form>
    </div>
  );
}
