
import { useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import Header from "@/components/Header";
import ContactGrid from "@/components/ContactGrid";

const Index = () => {
  const { toast } = useToast();
  
  useEffect(() => {
    // Show toast on first load to indicate persistence is active
    const hasShownPersistenceToast = sessionStorage.getItem('shown_persistence_toast');
    if (!hasShownPersistenceToast) {
      toast({
        description: "Contact data is now saved in your browser's local storage",
        duration: 3000,
      });
      sessionStorage.setItem('shown_persistence_toast', 'true');
    }
  }, [toast]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="container mx-auto px-4 flex-1">
        <ContactGrid />
      </main>
    </div>
  );
};

export default Index;
