
import { motion } from "framer-motion";

interface EmptyStateProps {
  searchTerm?: string;
  filter?: string;
}

export function EmptyState({ searchTerm, filter }: EmptyStateProps) {
  let message = "Empty...";
  
  if (searchTerm) {
    message = `No notes found for "${searchTerm}"`;
  } else if (filter && filter !== "ALL") {
    message = `No ${filter.toLowerCase()} notes`;
  }
  
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center h-[50vh] text-center px-4"
    >
      <div className="w-64 h-64 mb-4">
        <img 
          src="/assets/9f99a813-6994-4e4d-a7c7-b158d5dc7f71.png" 
          alt="Detective looking for notes" 
          className="w-full h-full object-contain" 
        />
      </div>
      <h3 className="text-xl font-medium">{message}</h3>
    </motion.div>
  );
}
