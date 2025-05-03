import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import jwtDecode from 'jwt-decode';

interface AuthState {
  token: string | null;
  role: string | null;
}

const initialState: AuthState = {
  token: localStorage.getItem('token') || null,
  role: localStorage.getItem('token')
    ? (jwtDecode<{ role: string }>(localStorage.getItem('token')!).role)
    : null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.token = action.payload.token;
      state.role = jwtDecode<{ role: string }>(action.payload.token).role;
    },
    logout: (state) => {
      state.token = null;
      state.role = null;
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export const selectIsAuthenticated = (state: RootState) => !!state.auth.token;
export const selectUserRole = (state: RootState) => state.auth.role;

export default authSlice.reducer;