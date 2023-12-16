import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import DraftDataService from "../services/DraftService";

const initialState = [];

export const fetchDraftedPlayers = createAsyncThunk(
  "Draft/GetDraftPicksForLeague",
  async (data) => {
    const res = await DraftDataService.getDraftSelections(data);
    return res.data;
  }
);

const draftSlice = createSlice({
  name: "draftPicks",
  initialState,
  extraReducers: {
    [fetchDraftedPlayers.fulfilled]: (state, action) => {
      return [...action.payload];
    },
  },
});

const { reducer } = draftSlice;
export default reducer;