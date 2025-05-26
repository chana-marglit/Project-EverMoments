// // src/store/authSlice.ts
// import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// interface AuthState {
//   token: string | null;
//   isAuthenticated: boolean;
//   fullName: string | null;
// }

// const initialState: AuthState = {
//   token: null,
//   isAuthenticated: false,
//   fullName: null,
// };

// export const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {
//     login: (state, action: PayloadAction<{ token: string; fullName: string }>) => {
//       state.token = action.payload.token;
//       state.fullName = action.payload.fullName;
//       state.isAuthenticated = true;
//     },
//     logout: (state) => {
//       state.token = null;
//       state.fullName = null;
//       state.isAuthenticated = false;
//     },
//   },
// });

// export const { login, logout } = authSlice.actions;
// export default authSlice.reducer;

// src/store/authSlice.ts
 import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// interface AuthState {
//   token: string | null;
//   fullName: string | null;
//   isAuthenticated: boolean;
// }

// const initialState: AuthState = {
//   token: null,
//   fullName: null,
//   isAuthenticated: false,
// };

// export const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {
//     login: (state, action: PayloadAction<{ token: string; fullName: string }>) => {
//       state.token = action.payload.token;
//       state.fullName = action.payload.fullName;
//       state.isAuthenticated = true;
//     },
//     logout: (state) => {
//       state.token = null;
//       state.fullName = null;
//       state.isAuthenticated = false;
//     },
//   },
// });

// export const { login, logout } = authSlice.actions;
// export default authSlice.reducer;
interface AuthState {
  token: string | null;
  fullName: string | null;
  userId: number | null;
  isAuthenticated: boolean;
  loading: boolean;
}

const initialState: AuthState = {
  token: null,
  fullName: null,
  userId:  null,
  isAuthenticated: false,
  loading: true, // ⬅️ טוען בתחילת האפליקציה
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ token: string; fullName: string; userId: number }>) => {
      state.token = action.payload.token;
      state.fullName = action.payload.fullName;
      state.userId = action.payload.userId;
      state.isAuthenticated = true;
      state.loading = false;
    },
    logout: (state) => {
      state.token = null;
      state.fullName = null;
      state.isAuthenticated = false;
      state.loading = false;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    }
  }
});

export const { login, logout, setLoading } = authSlice.actions;
export default authSlice.reducer;
