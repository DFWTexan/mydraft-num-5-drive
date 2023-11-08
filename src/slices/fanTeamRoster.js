import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import DraftDataService from "../services/DraftService";

const initialState = [];

export const fetchFanTeamRoster = createAsyncThunk(
  "Draft/GetDraftPicksByFanTeam",
  async (data) => {
    const res = await DraftDataService.GetDraftPicksByFanTeam(data);
    return res.data;
  }
);

const fanTeamRosterSlice = createSlice({
  name: "fanTeamRoster",
  initialState,
  extraReducers: {
    [fetchFanTeamRoster.fulfilled]: (state, action) => {
      return [...action.payload];
    },
  },
});

const { reducer } = fanTeamRosterSlice;
export default reducer;