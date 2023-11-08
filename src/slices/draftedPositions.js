import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import DraftDataService from "../services/DraftService";

const initialState = [];

export const fetchDraftedPlayerPositions = createAsyncThunk(
  "Draft/GetDraftPicksByPosition",
  async () => {
    const res = await DraftDataService.GetDraftPicksByPosition();
    return res.data;
  }
);

const drafedPositionstSlice = createSlice({
  name: "draftedPositions",
  initialState,
  extraReducers: {
    [fetchDraftedPlayerPositions.fulfilled]: (state, action) => {
      return [...action.payload];
    },
  },
});

const { reducer } = drafedPositionstSlice;
export default reducer;