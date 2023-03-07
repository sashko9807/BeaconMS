import { api } from './baseQuery';

export const beaconQueries = api.injectEndpoints({
  endpoints: (builder) => ({
    addBeacon: builder.mutation({
      query: (beaconData) => ({
        url: '/beacon/',
        method: 'POST',
        body: { ...beaconData },
      }),
      invalidatesTags: ['Beacon'],
    }),
    editBeacon: builder.mutation({
      query: ({ beaconID, beaconData }) => ({
        url: `/beacon/${beaconID}`,
        method: 'PUT',
        body: beaconData,
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
  useAddBeaconMutation,
  useDeleteBeaconMutation,
  useGetBeaconsForBuildingQuery,
  useEditBeaconMutation,
} = beaconQueries;

