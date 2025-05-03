
import { configureStore } from '@reduxjs/toolkit';
import contactsReducer from './contactsSlice';
import themeReducer from './themeSlice';

// Load contacts from localStorage if available
const loadContactsFromStorage = () => {
  try {
    const persistedContacts = localStorage.getItem('contacts');
    return persistedContacts ? JSON.parse(persistedContacts) : undefined;
  } catch (error) {
    console.error('Failed to load contacts from localStorage:', error);
    return undefined;
  }
};

// Create store with preloaded state
export const store = configureStore({
  reducer: {
    contacts: contactsReducer,
    theme: themeReducer,
  },
  preloadedState: {
    contacts: loadContactsFromStorage(),
  },
});

// Subscribe to store changes and save contacts to localStorage
store.subscribe(() => {
  const state = store.getState();
  try {
    localStorage.setItem('contacts', JSON.stringify(state.contacts));
  } catch (error) {
    console.error('Failed to save contacts to localStorage:', error);
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
