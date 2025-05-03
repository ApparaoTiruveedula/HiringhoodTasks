
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Recipe } from '../types/recipe';
import { v4 as uuidv4 } from 'uuid';

interface RecipeState {
  recipes: Recipe[];
  isLoading: boolean;
  error: string | null;
}

const initialRecipes: Recipe[] = [
  {
    id: '1',
    title: 'Classic Spaghetti Bolognese',
    description: 'A rich and hearty Italian pasta dish with a meaty tomato sauce.',
    imageUrl: 'https://images.unsplash.com/photo-1622973536968-3ead9e780960?q=80&w=2070&auto=format&fit=crop',
    ingredients: [
      '500g ground beef',
      '1 large onion, finely chopped',
      '2 garlic cloves, minced',
      '2 carrots, diced',
      '2 celery sticks, diced',
      '2 tbsp tomato puree',
      '800g canned chopped tomatoes',
      '2 bay leaves',
      'Fresh basil, chopped',
      'Salt and pepper to taste',
      '500g spaghetti',
      'Grated parmesan cheese'
    ],
    instructions: 'Heat oil in a large pan. Add onions, carrots, and celery, and cook until softened. Add garlic and cook for another minute. Add ground beef and cook until browned. Stir in tomato puree and cook for 2 minutes. Add canned tomatoes, bay leaves, salt, and pepper. Simmer for 1-1.5 hours, stirring occasionally. Meanwhile, cook spaghetti according to package instructions. Serve sauce over spaghetti, topped with fresh basil and grated parmesan.',
    prepTime: '15 minutes',
    cookTime: '1 hour 30 minutes',
    servings: 4,
    difficulty: 'Easy',
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    title: 'Chicken Tikka Masala',
    description: 'A flavorful Indian curry dish with marinated chicken in a creamy tomato sauce.',
    imageUrl: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?q=80&w=2071&auto=format&fit=crop',
    ingredients: [
      '500g chicken breast, cut into chunks',
      '1 cup yogurt',
      '2 tbsp lemon juice',
      '2 tsp ground cumin',
      '2 tsp ground coriander',
      '2 tsp paprika',
      '1 tsp turmeric',
      '1 tsp garam masala',
      '1 large onion, diced',
      '3 garlic cloves, minced',
      '1 tbsp ginger, grated',
      '400g canned tomatoes',
      '1 cup heavy cream',
      'Fresh cilantro, chopped',
      'Salt to taste'
    ],
    instructions: 'Marinate chicken in yogurt, lemon juice, and half the spices for at least 1 hour. Grill or bake the marinated chicken until cooked through. In a large pan, sauté onions until golden. Add garlic and ginger, cook for 1 minute. Add remaining spices and cook for 30 seconds. Add canned tomatoes and simmer for 10 minutes. Add the cooked chicken and simmer for another 5 minutes. Stir in heavy cream and heat through. Garnish with fresh cilantro and serve with rice or naan.',
    prepTime: '1 hour 15 minutes',
    cookTime: '30 minutes',
    servings: 4,
    difficulty: 'Medium',
    createdAt: new Date().toISOString()
  },
  {
    id: '3',
    title: 'Classic Caesar Salad',
    description: 'A refreshing salad with crisp romaine lettuce, parmesan cheese, croutons, and a creamy dressing.',
    imageUrl: 'https://images.unsplash.com/photo-1551248429-40975aa4de74?q=80&w=2490&auto=format&fit=crop',
    ingredients: [
      '2 heads romaine lettuce, torn into pieces',
      '1 cup croutons',
      '1/2 cup grated parmesan cheese',
      '1/4 cup Caesar dressing',
      '2 tbsp lemon juice',
      '1 garlic clove, minced',
      '1 tsp Dijon mustard',
      '1/2 tsp Worcestershire sauce',
      '2 anchovy fillets, minced (optional)',
      'Freshly ground black pepper'
    ],
    instructions: 'In a large bowl, whisk together garlic, lemon juice, Dijon mustard, Worcestershire sauce, and anchovies (if using). Slowly drizzle in olive oil while whisking to emulsify. Add salt and pepper to taste. Add romaine lettuce to the bowl and toss to coat with the dressing. Add croutons and toss gently. Sprinkle with grated parmesan cheese and freshly ground black pepper before serving.',
    prepTime: '15 minutes',
    cookTime: '0 minutes',
    servings: 4,
    difficulty: 'Easy',
    createdAt: new Date().toISOString()
  }
];

const initialState: RecipeState = {
  recipes: [],
  isLoading: false,
  error: null,
};

// Function to load recipes from localStorage
export const loadRecipesFromLocalStorage = (): RecipeState => {
  try {
    const savedState = localStorage.getItem('recipes');
    if (savedState) {
      return JSON.parse(savedState);
    }
    // If no data in localStorage, return initial state with default recipes
    return {
      ...initialState,
      recipes: initialRecipes
    };
  } catch (error) {
    console.error('Error loading recipes from localStorage:', error);
    return {
      ...initialState,
      recipes: initialRecipes
    };
  }
};

const recipeSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {
    addRecipe: (state, action: PayloadAction<Omit<Recipe, 'id' | 'createdAt'>>) => {
      const newRecipe: Recipe = {
        ...action.payload,
        id: uuidv4(),
        createdAt: new Date().toISOString(),
      };
      state.recipes.push(newRecipe);
    },
    editRecipe: (state, action: PayloadAction<Recipe>) => {
      const index = state.recipes.findIndex(recipe => recipe.id === action.payload.id);
      if (index !== -1) {
        state.recipes[index] = action.payload;
      }
    },
    deleteRecipe: (state, action: PayloadAction<string>) => {
      state.recipes = state.recipes.filter(recipe => recipe.id !== action.payload);
    },
  },
});

export const { addRecipe, editRecipe, deleteRecipe } = recipeSlice.actions;

export default recipeSlice.reducer;