
import React from 'react';
import RecipeForm from '@/components/RecipeForm';

const AddRecipePage: React.FC = () => {
  return (
    <div className="container py-8 animate-fade-in">
      <h1 className="text-3xl font-bold mb-6">Add New Recipe</h1>
      <RecipeForm />
    </div>
  );
};

export default AddRecipePage;
