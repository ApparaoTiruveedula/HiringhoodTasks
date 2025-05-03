
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-sky-50 to-indigo-50 p-4">
      <div className="text-center max-w-md">
        <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 mb-6">
          <span className="text-4xl font-bold text-primary">404</span>
        </div>
        <h1 className="text-3xl font-bold mb-4 tracking-tight">Page not found</h1>
        <p className="text-lg text-muted-foreground mb-8">
          Sorry, we couldn't find the page you're looking for.
        </p>
        <Button asChild size="lg" className="rounded-full px-8">
          <Link to="/">Return to Home</Link>
        </Button>
      </div>
      
      {/* Background decorations */}
      <div className="absolute bottom-[-200px] right-[-200px] w-[400px] h-[400px] rounded-full bg-sky-100/40 -z-10 blur-3xl"></div>
      <div className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] rounded-full bg-indigo-100/30 -z-10 blur-3xl"></div>
    </div>
  );
};

export default NotFound;
