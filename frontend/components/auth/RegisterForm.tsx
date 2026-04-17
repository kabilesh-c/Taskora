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
      
      <div className="mb-8 text-center sm:text-left">
        <h1 className="text-3xl font-bold tracking-tight text-text-primary mb-2">Create an account</h1>
        <p className="text-text-secondary">Join TaskFlow and streamline your workflows.</p>
      </div>

      <form onSubmit={handleRegister} className="space-y-4">
        <Input
          label="Full Name"
          name="fullName"
          type="text"
          placeholder="John Doe"
          value={formData.fullName}
          onChange={handleChange}
          required
        />
        
        <Input
          label="Email address"
          name="email"
          type="email"
          placeholder="name@agency.com"
          value={formData.email}
          onChange={handleChange}
          required
        />
        
        <Input
          label="Password"
          name="password"
          type="password"
          placeholder="Min. 8 characters"
          value={formData.password}
          onChange={handleChange}
          required
        />
        
        <Input
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          placeholder="Repeat password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
        
        <div className="pt-2">
          <label className="flex items-start space-x-2 cursor-pointer">
            <input type="checkbox" required className="mt-1 rounded text-primary focus:ring-primary h-4 w-4 border-gray-300" />
            <span className="text-xs text-text-secondary">
              I agree to the <a href="#" className="font-medium text-primary hover:underline">Terms of Service</a> and <a href="#" className="font-medium text-primary hover:underline">Privacy Policy</a>.
            </span>
          </label>
        </div>

        <Button type="submit" className="w-full mt-4" isLoading={isLoading}>
          Create Account
        </Button>
      </form>

      <p className="text-center text-sm text-text-secondary mt-8">
        Already have an account?{' '}
        <Link href="/login" className="font-semibold text-primary hover:text-secondary transition-colors">
          Sign In here
        </Link>
      </p>
    </div>
  );
}
