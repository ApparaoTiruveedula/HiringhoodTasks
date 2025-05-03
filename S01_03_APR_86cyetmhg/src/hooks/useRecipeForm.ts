
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAppDispatch } from './useAppDispatch';
import { addRecipe, editRecipe } from '../store/recipeSlice';
import { Recipe, RecipeFormValues } from '../types/recipe';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';

const validationSchema = Yup.object({
  title: Yup.string()
    .required('Title is required')
    .min(3, 'Title must be at least 3 characters')
    .max(50, 'Title must be less than 50 characters'),
  description: Yup.string()
    .required('Description is required')
    .min(10, 'Description must be at least 10 characters')
    .max(300, 'Description must be less than 300 characters'),
  imageUrl: Yup.string()
    .required('Recipe image is required'),
  ingredients: Yup.string()
    .required('Ingredients are required')
    .min(10, 'Ingredients must be at least 10 characters'),
  instructions: Yup.string()
    .required('Instructions are required')
    .min(30, 'Instructions must be at least 30 characters'),
  prepTime: Yup.string().required('Preparation time is required'),
  cookTime: Yup.string().required('Cooking time is required'),
  servings: Yup.number()
    .required('Number of servings is required')
    .min(1, 'At least 1 serving is required')
    .max(20, 'Maximum 20 servings allowed'),
  difficulty: Yup.string()
    .oneOf(['Easy', 'Medium', 'Hard'], 'Select a valid difficulty')
    .required('Difficulty is required'),
});

export const useRecipeForm = (existingRecipe?: Recipe) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const initialValues: RecipeFormValues = {
    title: existingRecipe?.title || '',
    description: existingRecipe?.description || '',
    imageUrl: existingRecipe?.imageUrl || '',
    ingredients: existingRecipe?.ingredients ? existingRecipe.ingredients.join('\n') : '',
    instructions: existingRecipe?.instructions || '',
    prepTime: existingRecipe?.prepTime || '',
    cookTime: existingRecipe?.cookTime || '',
    servings: existingRecipe?.servings || 1,
    difficulty: existingRecipe?.difficulty || 'Easy',
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      try {
        const recipeData = {
          ...values,
          ingredients: values.ingredients.split('\n').filter(item => item.trim() !== ''),
        };

        if (existingRecipe) {
          dispatch(editRecipe({
            ...recipeData,
            id: existingRecipe.id,
            createdAt: existingRecipe.createdAt,
          }));
          toast({
            title: "Recipe updated",
            description: `"${values.title}" has been updated successfully.`,
          });
        } else {
          dispatch(addRecipe(recipeData));
          toast({
            title: "Recipe added",
            description: `"${values.title}" has been added to your recipe book.`,
          });
        }
        navigate('/');
      } catch (error) {
        console.error('Error saving recipe:', error);
        toast({
          title: "Error",
          description: "There was an error saving your recipe. Please try again.",
          variant: "destructive",
        });
      }
    },
  });

  return formik;
};