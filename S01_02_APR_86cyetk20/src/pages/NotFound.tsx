
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center">
      <div className="bg-primary/5 p-8 rounded-full mb-6">
        <svg
          className="h-16 w-16 text-primary/60"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 21a9 9 0 110-18 9 9 0 010 18z"
          />
        </svg>
      </div>
      
      <h1 className="text-4xl font-bold mb-2">404</h1>
      <p className="text-xl text-muted-foreground mb-8">
        Oops! The page you're looking for doesn't exist.
      </p>
      
      <Button asChild>
        <Link to="/">Go back to contacts</Link>
      </Button>
    </div>
  );
};

export default NotFound;
