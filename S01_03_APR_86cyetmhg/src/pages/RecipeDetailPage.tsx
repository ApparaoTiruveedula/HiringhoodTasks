
import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { deleteRecipe } from '@/store/recipeSlice';
import { Button } from '@/components/ui/button';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Edit, Trash2, Clock, ArrowLeft, BookOpen } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const RecipeDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  
  const recipe = useAppSelector((state) => 
    state.recipes.recipes.find((recipe) => recipe.id === id)
  );

  if (!recipe) {
    return (
      <div className="container py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Recipe Not Found</h1>
        <p className="mb-8">The recipe you're looking for doesn't exist or has been removed.</p>
        <Link to="/">
          <Button>Return to Home</Button>
        </Link>
      </div>
    );
  }

  const handleDelete = () => {
    dispatch(deleteRecipe(recipe.id));
    toast({
      title: "Recipe deleted",
      description: `"${recipe.title}" has been removed from your recipe book.`,
    });
    navigate('/');
  };

  return (
    <div className="container py-8 animate-fade-in">
      <div className="flex items-center mb-8">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/')}
          className="mr-2"
        >
          <ArrowLeft size={16} className="mr-1" />
          Back
        </Button>
        <div className="flex-1" />
        <Link to={`/recipe/edit/${recipe.id}`} className="mr-2">
          <Button variant="outline" className="flex items-center">
            <Edit size={16} className="mr-1" />
            Edit
          </Button>
        </Link>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" className="flex items-center">
              <Trash2 size={16} className="mr-1" />
              Delete
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Recipe</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete "{recipe.title}"? This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="w-full aspect-video overflow-hidden rounded-lg mb-6">
            <img 
              src={recipe.imageUrl} 
              alt={recipe.title} 
              className="w-full h-full object-cover"
            />
          </div>
          <h1 className="text-3xl font-bold mb-2">{recipe.title}</h1>
          <p className="text-muted-foreground mb-6">{recipe.description}</p>
          
          <div className="flex flex-wrap gap-4 mb-8">
            <div className="flex items-center bg-gray-50 px-4 py-2 rounded-md">
              <Clock size={18} className="text-recipe-amber mr-2" />
              <div>
                <div className="text-xs text-gray-500">Prep Time</div>
                <div className="font-medium">{recipe.prepTime}</div>
              </div>
            </div>
            
            <div className="flex items-center bg-gray-50 px-4 py-2 rounded-md">
              <Clock size={18} className="text-recipe-amber mr-2" />
              <div>
                <div className="text-xs text-gray-500">Cook Time</div>
                <div className="font-medium">{recipe.cookTime}</div>
              </div>
            </div>
            
            <div className="flex items-center bg-gray-50 px-4 py-2 rounded-md">
              <BookOpen size={18} className="text-recipe-amber mr-2" />
              <div>
                <div className="text-xs text-gray-500">Difficulty</div>
                <div className="font-medium">{recipe.difficulty}</div>
              </div>
            </div>
            
            <div className="flex items-center bg-gray-50 px-4 py-2 rounded-md">
              <BookOpen size={18} className="text-recipe-amber mr-2" />
              <div>
                <div className="text-xs text-gray-500">Servings</div>
                <div className="font-medium">{recipe.servings}</div>
              </div>
            </div>
          </div>
          
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4 pb-2 border-b">Instructions</h2>
            <div className="whitespace-pre-wrap">{recipe.instructions}</div>
          </div>
        </div>
        
        <div>
          <div className="bg-gray-50 p-6 rounded-lg sticky top-24">
            <h2 className="text-xl font-bold mb-4 pb-2 border-b">Ingredients</h2>
            <ul className="space-y-2">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index} className="flex items-start">
                  <span className="inline-block w-2 h-2 mt-1.5 mr-2 bg-recipe-amber rounded-full"></span>
                  <span>{ingredient}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetailPage;
