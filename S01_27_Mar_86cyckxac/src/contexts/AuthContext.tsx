
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';
import { User, createUser, findUserByEmail } from '@/lib/db';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const checkAuthState = async () => {
      try {
        const storedUser = localStorage.getItem('authUser');
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser) as User;
          // Verify user exists in IndexedDB (in case localStorage was manipulated)
          const dbUser = await findUserByEmail(parsedUser.email);
          if (dbUser) {
            setUser(parsedUser);
          } else {
            localStorage.removeItem('authUser');
          }
        }
      } catch (error) {
        console.error('Error checking auth state:', error);
        localStorage.removeItem('authUser');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthState();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const existingUser = await findUserByEmail(email);
      
      if (!existingUser || existingUser.password !== password) {
        toast.error('Invalid email or password');
        return false;
      }
      
      // Remove password from user object stored in state/localStorage
      const { password: _, ...userWithoutPassword } = existingUser;
      setUser(existingUser);
      localStorage.setItem('authUser', JSON.stringify(existingUser));
      
      toast.success('Logged in successfully');
      return true;
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Failed to login');
      return false;
    }
  };

  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    try {
      const existingUser = await findUserByEmail(email);
      
      if (existingUser) {
        toast.error('Email already in use');
        return false;
      }
      
      const newUser = await createUser({ name, email, password });
      
      // Remove password from user object stored in state/localStorage
      const { password: _, ...userWithoutPassword } = newUser;
      setUser(newUser);
      localStorage.setItem('authUser', JSON.stringify(newUser));
      
      toast.success('Account created successfully');
      return true;
    } catch (error) {
      console.error('Signup error:', error);
      toast.error('Failed to create account');
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('authUser');
    toast.success('Logged out successfully');
  };

  const value = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    signup,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
}
