
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to login
    navigate('/login');
  }, [navigate]);

  // Loading state while redirecting
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-50 to-indigo-50">
      <div className="text-center animate-pulse-subtle">
        <div className="inline-block h-12 w-12 rounded-full bg-primary/20"></div>
        <p className="mt-4 text-muted-foreground">Redirecting...</p>
      </div>
    </div>
  );
};

export default Index;
