import { api } from './baseQuery';

export const userQueries = api.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (credentials) => ({
        url: '/user/register',
        method: 'POST',
        body: { ...credentials },
      }),
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: '/user/login',
        method: 'POST',
        body: { ...credentials },
      }),
    }),
    updatePassword: builder.mutation({
      query: (credentials) => ({
        url: `/user/:id`,
        method: 'PUT',
        params: { ...credentials },
      }),
    }),
    forgotPassword: builder.mutation({
      query: ({ email }) => ({
        url: `/user/forgotPassword/${email}`,
        method: 'PUT',
        params: email,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useUpdatePasswordMutation,
  useForgotPasswordMutation,
} = userQueries;
