
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Recipe } from '@/types/recipe';
import { useRecipeForm } from '@/hooks/useRecipeForm';
import { UploadCloud } from 'lucide-react';

interface RecipeFormProps {
  recipe?: Recipe;
}

const RecipeForm: React.FC<RecipeFormProps> = ({ recipe }) => {
  const formik = useRecipeForm(recipe);
  const [previewImage, setPreviewImage] = useState<string | null>(recipe?.imageUrl || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('Image size must be less than 5MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setPreviewImage(result);
      formik.setFieldValue('imageUrl', result);
    };
    reader.readAsDataURL(file);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div>
      <form onSubmit={formik.handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium mb-1">
              Recipe Title
            </label>
            <Input
              id="title"
              name="title"
              placeholder="Enter recipe title"
              {...formik.getFieldProps('title')}
              className={formik.touched.title && formik.errors.title ? 'border-red-500' : ''}
            />
            {formik.touched.title && formik.errors.title && (
              <div className="text-red-500 text-xs mt-1">{formik.errors.title}</div>
            )}
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium mb-1">
              Description
            </label>
            <Textarea
              id="description"
              name="description"
              placeholder="Brief description of your recipe"
              rows={3}
              {...formik.getFieldProps('description')}
              className={formik.touched.description && formik.errors.description ? 'border-red-500' : ''}
            />
            {formik.touched.description && formik.errors.description && (
              <div className="text-red-500 text-xs mt-1">{formik.errors.description}</div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Recipe Image
            </label>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageChange}
              accept="image/*"
              className="hidden"
            />
            <div 
              onClick={triggerFileInput}
              className={`border-2 border-dashed rounded-md p-6 cursor-pointer text-center hover:bg-gray-50 transition-colors ${
                formik.touched.imageUrl && formik.errors.imageUrl ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              {previewImage ? (
                <div className="mb-2">
                  <img 
                    src={previewImage} 
                    alt="Recipe preview" 
                    className="mx-auto w-full max-h-64 object-cover rounded-md" 
                  />
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center">
                  <UploadCloud className="h-12 w-12 text-gray-400 mb-2" />
                  <p className="text-sm text-gray-600">Click to upload recipe image</p>
                  <p className="text-xs text-gray-500 mt-1">(Max size: 5MB)</p>
                </div>
              )}
            </div>
            {formik.touched.imageUrl && formik.errors.imageUrl && (
              <div className="text-red-500 text-xs mt-1">{formik.errors.imageUrl}</div>
            )}
            {previewImage && (
              <div className="mt-2 text-right">
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm"
                  onClick={triggerFileInput}
                >
                  Change Image
                </Button>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="prepTime" className="block text-sm font-medium mb-1">
                Prep Time
              </label>
              <Input
                id="prepTime"
                name="prepTime"
                placeholder="e.g. 15 minutes"
                {...formik.getFieldProps('prepTime')}
                className={formik.touched.prepTime && formik.errors.prepTime ? 'border-red-500' : ''}
              />
              {formik.touched.prepTime && formik.errors.prepTime && (
                <div className="text-red-500 text-xs mt-1">{formik.errors.prepTime}</div>
              )}
            </div>

            <div>
              <label htmlFor="cookTime" className="block text-sm font-medium mb-1">
                Cook Time
              </label>
              <Input
                id="cookTime"
                name="cookTime"
                placeholder="e.g. 30 minutes"
                {...formik.getFieldProps('cookTime')}
                className={formik.touched.cookTime && formik.errors.cookTime ? 'border-red-500' : ''}
              />
              {formik.touched.cookTime && formik.errors.cookTime && (
                <div className="text-red-500 text-xs mt-1">{formik.errors.cookTime}</div>
              )}
            </div>

            <div>
              <label htmlFor="servings" className="block text-sm font-medium mb-1">
                Servings
              </label>
              <Input
                id="servings"
                name="servings"
                type="number"
                min="1"
                max="20"
                {...formik.getFieldProps('servings')}
                className={formik.touched.servings && formik.errors.servings ? 'border-red-500' : ''}
              />
              {formik.touched.servings && formik.errors.servings && (
                <div className="text-red-500 text-xs mt-1">{formik.errors.servings}</div>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="difficulty" className="block text-sm font-medium mb-1">
              Difficulty
            </label>
            <Select 
              name="difficulty" 
              value={formik.values.difficulty}
              onValueChange={(value) => formik.setFieldValue('difficulty', value)}
            >
              <SelectTrigger className={formik.touched.difficulty && formik.errors.difficulty ? 'border-red-500' : ''}>
                <SelectValue placeholder="Select difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Easy">Easy</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="Hard">Hard</SelectItem>
              </SelectContent>
            </Select>
            {formik.touched.difficulty && formik.errors.difficulty && (
              <div className="text-red-500 text-xs mt-1">{formik.errors.difficulty}</div>
            )}
          </div>

          <div>
            <label htmlFor="ingredients" className="block text-sm font-medium mb-1">
              Ingredients (one per line)
            </label>
            <Textarea
              id="ingredients"
              name="ingredients"
              placeholder="500g chicken breast
1 onion, chopped
2 cloves garlic, minced"
              rows={6}
              {...formik.getFieldProps('ingredients')}
              className={formik.touched.ingredients && formik.errors.ingredients ? 'border-red-500' : ''}
            />
            {formik.touched.ingredients && formik.errors.ingredients && (
              <div className="text-red-500 text-xs mt-1">{formik.errors.ingredients}</div>
            )}
          </div>

          <div>
            <label htmlFor="instructions" className="block text-sm font-medium mb-1">
              Instructions
            </label>
            <Textarea
              id="instructions"
              name="instructions"
              placeholder="Detailed cooking instructions..."
              rows={8}
              {...formik.getFieldProps('instructions')}
              className={formik.touched.instructions && formik.errors.instructions ? 'border-red-500' : ''}
            />
            {formik.touched.instructions && formik.errors.instructions && (
              <div className="text-red-500 text-xs mt-1">{formik.errors.instructions}</div>
            )}
          </div>
        </div>

        <div className="flex justify-end space-x-2">
          <Button type="button" variant="outline" onClick={() => window.history.back()}>
            Cancel
          </Button>
          <Button type="submit" className="bg-recipe-amber hover:bg-recipe-dark-amber">
            {recipe ? 'Update Recipe' : 'Add Recipe'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default RecipeForm;