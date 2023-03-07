import { api } from './baseQuery';

export const buildingQueries = api.injectEndpoints({
  endpoints: (builder) => ({
    getBuilding: builder.query({
      query: () => ({
        url: '/building/:userId',
        method: 'GET',
      }),
      providesTags: ['Building'],
    }),
    addBuilding: builder.mutation({
      query: ({ formData }) => ({
        url: '/building/add',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['Building'],
    }),
  }),
});

export const { useGetBuildingQuery, useAddBuildingMutation } = buildingQueries;
