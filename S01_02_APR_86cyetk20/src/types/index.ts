
export interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  image: string;
  isFavorite: boolean;
  address?: string;
  company?: string;
  notes?: string;
}

export interface ContactFormValues {
  name: string;
  email: string;
  phone: string;
  address?: string;
  company?: string;
  notes?: string;
  image?: File | null;
}

export type FilterType = 'all' | 'favorites';
