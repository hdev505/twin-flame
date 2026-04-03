import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

interface Customer {
  id: string;
  email: string;
  name?: string;
}

interface AuthContextType {
  customer: Customer | null;
  isLoading: boolean;
  signIn: (email: string, name?: string) => Promise<Customer>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_KEY = 'tfi_customer';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [customer, setCustomer] = useState<Customer | null>(() => {
    try {
      const stored = localStorage.getItem(AUTH_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (customer) {
      localStorage.setItem(AUTH_KEY, JSON.stringify(customer));
    } else {
      localStorage.removeItem(AUTH_KEY);
    }
  }, [customer]);

  const signIn = async (email: string, name?: string): Promise<Customer> => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('ecom_customers')
        .upsert({ email, name: name || email.split('@')[0] }, { onConflict: 'email' })
        .select('id, email, name')
        .single();

      if (error) throw error;
      const cust: Customer = { id: data.id, email: data.email, name: data.name };
      setCustomer(cust);
      return cust;
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = () => {
    setCustomer(null);
    localStorage.removeItem(AUTH_KEY);
  };

  return (
    <AuthContext.Provider value={{ customer, isLoading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
