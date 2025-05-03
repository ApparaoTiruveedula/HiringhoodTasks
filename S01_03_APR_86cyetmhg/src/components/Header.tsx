
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Plus, Book } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-white border-b py-4 sticky top-0 z-10">
      <div className="container flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2 text-recipe-amber hover:text-recipe-dark-amber transition-colors">
          <Book size={24} />
          <h1 className="text-xl font-bold">Recipe Bazaar</h1>
        </Link>
        <Link to="/recipe/new">
          <Button className="flex items-center space-x-1 bg-recipe-amber hover:bg-recipe-dark-amber text-white">
            <Plus size={18} />
            <span>Add Recipe</span>
          </Button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
