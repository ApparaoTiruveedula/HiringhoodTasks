
import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Home = () => {
  const { user, logout } = useAuth();
  const [scrollPosition, setScrollPosition] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navbarOpacity = Math.min(scrollPosition / 100, 1);

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <header 
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{ 
          backgroundColor: `rgba(255, 255, 255, ${navbarOpacity})`,
          backdropFilter: `blur(${navbarOpacity * 10}px)`,
          borderBottom: navbarOpacity > 0.2 ? '1px solid rgba(229, 231, 235, 1)' : 'none'
        }}
      >
        <div className="container mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1">
              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-white text-sm font-bold">
                S
              </div>
              <span className="text-lg font-medium">SimpliAuth</span>
            </div>
            
            <div className="flex items-center space-x-6">
              <span className="text-sm text-gray-600 mr-2 hidden sm:inline-block">
                Welcome, {user?.name}
              </span>
              <Button onClick={logout} variant="outline" size="sm">
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      
      
    </div>
  );
};

export default Home;
