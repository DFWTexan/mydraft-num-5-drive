import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import DraftDataService from "../services/DraftService";

const initialState = {};

export const fetchDraftStatus = createAsyncThunk(
  "DraftStatus/GetDraftStatus",
  async () => {
    const res = await DraftDataService.getDraftStatus();
    return res.data;
  }
);

const draftStatusSlice = createSlice({
  name: "draftStatus",
  initialState,
  extraReducers: {
    [fetchDraftStatus.fulfilled]: (state, action) => {
      return {...action.payload};
    },
  },
});

const { reducer } = draftStatusSlice;
export default reducer;
