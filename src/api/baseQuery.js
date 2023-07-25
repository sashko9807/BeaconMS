import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react';
import { reAuth, logOut } from '../redux/authActions';
import { API_URL, CDN_SERVER_URL } from '@env'
import { endpoints } from '../globals/apiEndpoints';

export const BASE_URL = API_URL ?? 'http://10.0.2.2:3001/';
export const CDN_URL = CDN_SERVER_URL ?? 'http://10.0.2.2:3001/uploads';

const CONN_TIMEOUT_MS = 10000


const baseApi = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const accessToken = getState().auth.accessToken;
    if (accessToken) headers.set('Authorization', `Bearer ${accessToken}`);
    return headers;
  },
});

const baseApiWithTimeout = (args, api, extraOptions) => {
  return Promise.race([
    baseApi(args, api, extraOptions),
    new Promise(resolve => setTimeout(() => resolve({
      error: {
        data: {
          status: '500',
          message: 'Couldn\'t connect to server',
        }
      }
    },
    ), CONN_TIMEOUT_MS))
  ])
}

const baseApiWithReauth = retry(async (args, api, extraOptions) => {
  console.log(args)
  let result = await baseApiWithTimeout(args, api, extraOptions);
  if (result.error?.originalStatus === 403) {
    const refreshToken = api.getState().auth.refreshToken;
    const refreshResult = await baseApiWithTimeout(
      {
        ...endpoints.auth.refresh,
        body: { refreshToken },
      },
      api,
      extraOptions
    );

    if (refreshResult?.data) {
      console.log(refreshResult.data)
      api.dispatch(
        reAuth({
          ...refreshResult.data,
          refreshToken: refreshToken,
        })
      );
      result = await baseApiWithTimeout(args, api, extraOptions);
    } else {
      api.dispatch(logOut());
    }
  }
  return result;
}, { maxRetries: 1 });

export const api = createApi({
  baseQuery: baseApiWithReauth,
  tagTypes: ['Building', 'Beacon'],
  endpoints: (builder) => ({}),
});
