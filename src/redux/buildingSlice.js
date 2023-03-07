import { createSlice } from '@reduxjs/toolkit';

const buildingSlice = createSlice({
  name: 'building',
  initialState: { buildingID: null, buildingName: null, totalFloors: null },
  reducers: {
    setBuildingData: {
      reducer: (state, action) => {
        state.buildingID = action.payload.buildingID;
        state.buildingName = action.payload.buildingName;
        state.totalFloors = action.payload.totalFloors;
      },
      prepare: (buildingID, buildingName, totalFloors) => {
        return {
          payload: {
            buildingID,
            buildingName,
            totalFloors,
          },
        };
      },
    },
  },
});

export default buildingSlice.reducer;

export const { setBuildingData } = buildingSlice.actions;

export const selectBuildingID = (state) => state.building.buildingID;
export const selectBuildingTotalFloors = (state) => state.building.totalFloors;
