import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import DraftDataService from "../services/DraftService";

const initialState = [];

export const fetchFanTeamSelections = createAsyncThunk(
  "Draft/GetTeamSelections",
  async (data) => {
    const res = await DraftDataService.GetFanTeamSelections(data);
    return res.data;
  }
);

const fanTeamSelectionsSlice = createSlice({
  name: "fanTeamSelections",
  initialState,
  extraReducers: {
    [fetchFanTeamSelections.fulfilled]: (state, action) => {
      return [...action.payload];
    },
  },
});

const { reducer } = fanTeamSelectionsSlice;
export default reducer;