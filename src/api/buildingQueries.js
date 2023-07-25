import { api } from './baseQuery';
import { endpoints } from '../globals/apiEndpoints';

export const buildingQueries = api.injectEndpoints({
  endpoints: (builder) => ({
    getBuilding: builder.query({
      query: () => ({
        ...endpoints.buildings.getBuildings
      }),
      providesTags: ['Building'],
    }),
    addBuilding: builder.mutation({
      query: ({ formData }) => ({
        ...endpoints.buildings.addBuilding,
        body: formData,
      }),
      invalidatesTags: ['Building'],
    }),
  }),
});

export const { useGetBuildingQuery, useAddBuildingMutation } = buildingQueries;
