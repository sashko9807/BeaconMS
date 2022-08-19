import { createSlice } from '@reduxjs/toolkit';
import { userQueries } from './userQueries';
import { REAUTHORIZE, LOGOUT } from './authActions';

const authSlice = createSlice({
  name: 'auth',
  initialState: { accessToken: null, refreshToken: null },
  extraReducers: (builder) => {
    builder.addCase(REAUTHORIZE, (state, { payload }) => {
      state.accessToken = payload.accessToken;
      state.refreshToken = payload.refreshToken;
    });
    builder.addCase(LOGOUT, (state, action) => {
      state.accessToken = null;
      state.refreshToken = null;
    });
    builder.addMatcher(
      userQueries.endpoints.login.matchFulfilled,
      (state, { payload }) => {
        state.accessToken = payload.accessToken;
        state.refreshToken = payload.refreshToken;
      }
    );
  },
});

export const { reAuth, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectAccessToken = (state) => state.auth.accessToken;
export const selectRefreshToken = (state) => state.auth.refreshToken;
