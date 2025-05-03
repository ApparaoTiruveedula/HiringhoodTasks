import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Category } from '../../types/category';

export const categoryApi = createApi({
  reducerPath: 'categoryApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Categories'],
  endpoints: (builder) => ({
    getCategories: builder.query<
      { data: Category[]; total: number; hasMore: boolean },
      { page?: number; limit?: number }
    >({
      query: ({ page = 1, limit = 10 } = {}) => `/categories?page=${page}&limit=${limit}`,
      providesTags: ['Categories'],
    }),
    createCategory: builder.mutation<Category, Partial<Category>>({
      query: (category) => ({
        url: '/categories',
        method: 'POST',
        body: category,
      }),
      invalidatesTags: ['Categories'],
    }),
    updateCategory: builder.mutation<Category, Partial<Category> & { _id: string }>({
      query: ({ _id, ...category }) => ({
        url: `/categories/${_id}`,
        method: 'PUT',
        body: category,
      }),
      invalidatesTags: ['Categories'],
    }),
    deleteCategory: builder.mutation<void, string>({
      query: (id) => ({
        url: `/categories/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Categories'],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi;

// Added helper hook for easy category fetching in forms!
export const useFetchCategoryOptions = () => {
  const { data, isLoading, isError, error } = useGetCategoriesQuery({});
  return {
    categories: data?.data || [],
    isLoading,
    isError,
    error,
  };
};
