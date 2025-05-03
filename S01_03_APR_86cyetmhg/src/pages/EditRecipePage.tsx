
import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useAppSelector } from '@/hooks/useAppSelector';
import RecipeForm from '@/components/RecipeForm';

const EditRecipePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  
  const recipe = useAppSelector((state) => 
    state.recipes.recipes.find((recipe) => recipe.id === id)
  );

  if (!recipe) {
    return <Navigate to="/" />;
  }

  return (
    <div className="container py-8 animate-fade-in">
      <h1 className="text-3xl font-bold mb-6">Edit Recipe</h1>
      <RecipeForm recipe={recipe} />
    </div>
  );
};

export default EditRecipePage;
