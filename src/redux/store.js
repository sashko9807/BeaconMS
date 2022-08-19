import { configureStore } from '@reduxjs/toolkit/';
import { userQueries } from './userQueries';
import authReducer from './authSlice';
import buildingReducer from './buildingSlice';

export const store = configureStore({
  reducer: {
    [userQueries.reducerPath]: userQueries.reducer,
    auth: authReducer,
    building: buildingReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userQueries.middleware),
});
