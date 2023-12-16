import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import LeagueDataService from "../services/LeagueService";

const initialState = {};

export const fetchActiveLeague = createAsyncThunk(
  "League/GetActiveLeague",
  async () => {
    const res = await LeagueDataService.getActiveLeague();
    return res.data;
  }
);

const leagueSlice = createSlice({
  name: "league",
  initialState,
  extraReducers: {
    [fetchActiveLeague.fulfilled]: (state, action) => {
      return {...action.payload};
    },
  },
});

const { reducer } = leagueSlice;
export default reducer;