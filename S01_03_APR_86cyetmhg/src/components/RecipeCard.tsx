
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Clock } from 'lucide-react';
import { Recipe } from '@/types/recipe';

interface RecipeCardProps {
  recipe: Recipe;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  return (
    <Link to={`/recipe/${recipe.id}`} className="block">
      <Card className="h-full overflow-hidden recipe-card animate-fade-in">
        <div className="aspect-video w-full overflow-hidden">
          <img 
            src={recipe.imageUrl} 
            alt={recipe.title} 
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>
        <CardContent className="pt-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-medium px-2 py-1 bg-recipe-cream text-recipe-dark-amber rounded-full">
              {recipe.difficulty}
            </span>
            <div className="flex items-center text-sm text-muted-foreground">
              <Clock size={14} className="mr-1" />
              <span>{recipe.cookTime}</span>
            </div>
          </div>
          <h3 className="font-bold text-lg mb-2 line-clamp-1">{recipe.title}</h3>
          <p className="text-muted-foreground text-sm line-clamp-2">
            {recipe.description}
          </p>
        </CardContent>
        <CardFooter className="text-sm text-muted-foreground">
          {recipe.servings} servings
        </CardFooter>
      </Card>
    </Link>
  );
};

export default RecipeCard;
