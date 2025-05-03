
import React from 'react';
import { useAppSelector } from '@/hooks/useAppSelector';
import RecipeCard from '@/components/RecipeCard';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

const HomePage: React.FC = () => {
  const { recipes } = useAppSelector((state) => state.recipes);

  return (
    <div className="container py-8 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">My Recipe Collection</h1>
          <p className="text-muted-foreground">Discover and organize your favorite recipes</p>
        </div>
        <Link to="/recipe/new" className="mt-4 md:mt-0">
          <Button className="flex items-center space-x-1 bg-recipe-amber hover:bg-recipe-dark-amber text-white">
            <Plus size={18} />
            <span>Add Recipe</span>
          </Button>
        </Link>
      </div>

      {recipes.length === 0 ? (
        <div className="text-center py-12 border-2 border-dashed rounded-lg border-gray-300 bg-gray-50">
          <h2 className="text-xl font-medium text-gray-500 mb-4">No recipes yet!</h2>
          <p className="text-gray-400 mb-6">Add your first recipe to get started.</p>
          <Link to="/recipe/new">
            <Button className="bg-recipe-amber hover:bg-recipe-dark-amber text-white">
              Add Your First Recipe
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;
