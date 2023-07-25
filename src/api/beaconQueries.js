import { api } from './baseQuery';
import { endpoints } from '../globals/apiEndpoints';

export const beaconQueries = api.injectEndpoints({
  endpoints: (builder) => ({
    addBeacon: builder.mutation({
      query: (beaconData) => ({
        ...endpoints.beacon.addBeacon,
        body: { ...beaconData },
      }),
      invalidatesTags: ['Beacon'],
    }),
    editBeacon: builder.mutation({
      query: ({ beaconID, beaconData }) => ({
        ...endpoints.beacon.editBeacon(beaconID),
        body: beaconData,
      }),
      invalidatesTags: ['Beacon'],
    }),
    getBeaconsForBuilding: builder.query({
      query: (buildingID) => ({
        ...endpoints.beacon.getBeacons(buildingID)
      }),
      providesTags: ['Beacon'],
    }),
    deleteBeacon: builder.mutation({
      query: (beaconID) => ({
        ...endpoints.beacon.deleteBeacon(beaconID),
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

