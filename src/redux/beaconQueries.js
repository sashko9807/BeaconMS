import { authQuery } from './authBaseQuery';

export const beaconQueries = authQuery.injectEndpoints({
  endpoints: (builder) => ({
    addWithText: builder.mutation({
      query: (beaconData) => ({
        url: '/beacon/',
        method: 'POST',
        body: { ...beaconData },
      }),
      invalidatesTags: ['Beacon'],
    }),
    editBeacon: builder.mutation({
      query: (beaconData) => ({
        url: `/beacon/${beaconData._id}`,
        method: 'PUT',
        params: { ...beaconData },
      }),
      invalidatesTags: ['Beacon'],
    }),
    getBeaconsForBuilding: builder.query({
      query: (buildingID) => ({
        url: `/beacon/${buildingID}`,
        method: 'GET',
      }),
      providesTags: ['Beacon'],
    }),
    deleteBeacon: builder.mutation({
      query: (beaconID) => ({
        url: `/beacon/${{ beaconID }}`,
        method: 'DELETE',
        params: beaconID,
      }),
      invalidatesTags: ['Beacon'],
    }),
  }),
});

export const {
  useAddWithTextMutation,
  useDeleteBeaconMutation,
  useGetBeaconsForBuildingQuery,
  useEditBeaconMutation,
} = beaconQueries;
