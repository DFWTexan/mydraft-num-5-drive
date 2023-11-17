import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import DraftDataService from "../services/DraftService";

const initialState = [];

export const fetchFanTeamRosterCount = createAsyncThunk(
  "Draft/GetRosterTotalPositionCount",
  async () => {
    const res = await DraftDataService.GetFanTeamRosters();
    return res.data;
  }
);

const fanTeamRosterCountSlice = createSlice({
  name: "fanTeamRosterCount",
  initialState,
  extraReducers: {
    [fetchFanTeamRosterCount.fulfilled]: (state, action) => {
      return [...action.payload];
    },
  },
});

const { reducer } = fanTeamRosterCountSlice;
export default reducer;