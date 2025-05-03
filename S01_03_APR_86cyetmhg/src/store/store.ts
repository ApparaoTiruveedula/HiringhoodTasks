
import { configureStore } from '@reduxjs/toolkit';
import recipeReducer, { loadRecipesFromLocalStorage } from './recipeSlice';

// Load saved recipes from localStorage when creating the store
const preloadedState = {
  recipes: loadRecipesFromLocalStorage()
};

export const store = configureStore({
  reducer: {
    recipes: recipeReducer,
  },
  preloadedState
});

// Subscribe to store changes and save to localStorage
store.subscribe(() => {
  const state = store.getState();
  localStorage.setItem('recipes', JSON.stringify(state.recipes));
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
