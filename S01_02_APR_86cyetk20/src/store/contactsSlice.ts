
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Contact } from '../types';
import { v4 as uuidv4 } from 'uuid';

// Sample data for initial state (only used if nothing in localStorage)
const initialContacts: Contact[] = [
  {
    id: uuidv4(),
    name: "Soojuca",
    email: "soojuca@gmail.com",
    phone: "5551234567",
    image: "https://source.unsplash.com/ZHvM3XIOHoE/400x400",
    isFavorite: true,
    company: "",
    address: "123 Main St, Tokyo, Japan",
    notes: "Met at the 2023 tech conference"
  },
  {
    id: uuidv4(),
    name: "Ganesh Allam",
    email: "ganesh@gmail.com",
    phone: "5559876543",
    image: "https://source.unsplash.com/iFgRcqHznqg/400x400",
    isFavorite: false,
    company: "Global Solutions Ltd.",
    address: "456 Park road,AP, India",
    notes: "College roommate, works in finance"
  },
  {
    id: uuidv4(),
    name: "Sirisha reddy",
    email: "sirisha@gmail.com",
    phone: "5552223333",
    image: "https://source.unsplash.com/7YVZYZeITc8/400x400",
    isFavorite: false,
    company: "",
    address: "789 Elm St, rajapudi,AP",
  },
  {
    id: uuidv4(),
    name: "Monica Mesendra",
    email: "monica@example.com",
    phone: "5554445555",
    image: "https://source.unsplash.com/rDEOVtE7vOs/400x400",
    isFavorite: true,
    company: "",
    address: "321 Oak Dr, Florida, US",
    notes: ""
  }
];

interface ContactsState {
  contacts: Contact[];
  selectedContact: Contact | null;
  filter: 'all' | 'favorites';
  searchTerm: string;
}

const initialState: ContactsState = {
  contacts: initialContacts,
  selectedContact: null,
  filter: 'all',
  searchTerm: '',
};

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    addContact: (state, action: PayloadAction<Omit<Contact, "id">>) => {
      const newContact = {
        ...action.payload,
        id: uuidv4(),
      };
      state.contacts.push(newContact);
      state.contacts.sort((a, b) => a.name.localeCompare(b.name));
    },
    updateContact: (state, action: PayloadAction<Contact>) => {
      const index = state.contacts.findIndex(contact => contact.id === action.payload.id);
      if (index !== -1) {
        state.contacts[index] = action.payload;
        if (state.selectedContact?.id === action.payload.id) {
          state.selectedContact = action.payload;
        }
      }
      state.contacts.sort((a, b) => a.name.localeCompare(b.name));
    },
    deleteContact: (state, action: PayloadAction<string>) => {
      state.contacts = state.contacts.filter(contact => contact.id !== action.payload);
      if (state.selectedContact?.id === action.payload) {
        state.selectedContact = null;
      }
    },
    toggleFavorite: (state, action: PayloadAction<string>) => {
      const contact = state.contacts.find(contact => contact.id === action.payload);
      if (contact) {
        contact.isFavorite = !contact.isFavorite;
        if (state.selectedContact?.id === action.payload) {
          state.selectedContact = { ...contact };
        }
      }
    },
    selectContact: (state, action: PayloadAction<string | null>) => {
      if (action.payload === null) {
        state.selectedContact = null;
      } else {
        const contact = state.contacts.find(contact => contact.id === action.payload);
        state.selectedContact = contact || null;
      }
    },
    setFilter: (state, action: PayloadAction<'all' | 'favorites'>) => {
      state.filter = action.payload;
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
  },
});

export const {
  addContact,
  updateContact,
  deleteContact,
  toggleFavorite,
  selectContact,
  setFilter,
  setSearchTerm
} = contactsSlice.actions;

export default contactsSlice.reducer;
