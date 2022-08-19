import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { reAuth, logOut } from './authActions';

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://192.168.0.100:3001',
  prepareHeaders: (headers, { getState }) => {
    const accessToken = getState().auth.accessToken;
    if (accessToken) headers.set('Authorization', `Bearer ${accessToken}`);
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  console.log(args);
  let result = await baseQuery(args, api, extraOptions);

  if (result.error?.originalStatus === 403) {
    const refreshToken = api.getState().auth.refreshToken;
    const refreshResult = await baseQuery(
      {
        url: '/auth/refreshToken',
        method: 'POST',
        body: { refreshToken },
      },
      api,
      extraOptions
    );

    if (refreshResult?.data) {
      api.dispatch(
        reAuth({
          ...refreshResult.data,
          refreshToken: refreshToken,
        })
      );
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logOut());
    }
  }
  return result;
};

export const authQuery = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Building', 'Beacon'],
  endpoints: (builder) => ({}),
});
