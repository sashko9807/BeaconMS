import { api } from './baseQuery';
import { endpoints } from '../globals/apiEndpoints';

export const userQueries = api.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (credentials) => ({
        ...endpoints.user.register,
        body: { ...credentials },
      }),
    }),
    login: builder.mutation({
      query: (credentials) => ({
        ...endpoints.user.login,
        body: { ...credentials },
      }),
    }),
    updatePassword: builder.mutation({
      query: (credentials) => ({
        ...endpoints.user.updatePassword(credentials.id),
        params: { ...credentials },
      }),
    }),
    forgotPassword: builder.mutation({
      query: ({ email }) => ({
        ...endpoints.user.forgottenPassword(email),
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
