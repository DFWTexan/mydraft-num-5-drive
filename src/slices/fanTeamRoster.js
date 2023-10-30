import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import DraftDataService from "../services/DraftService";

const initialState = [];

// export const fetchDraftStatus = createAsyncThunk(
//   "Draft/GetDraftStatus",
//   async (data) => {
//     const res = await DraftDataService.getDraftStatus(data);
//     return res.data;
//   }
// );

export const fetchFanTeamDraftedPlayers = createAsyncThunk(
  "Draft/GetDraftPicksByFanTeam",
  async (data) => {
    const res = await DraftDataService.getDraftSelections(data);
    return res.data;
  }
);

const draftSlice = createSlice({
  name: "fanTeamRoster",
  initialState,
  extraReducers: {
    [fetchFanTeamDraftedPlayers.fulfilled]: (state, action) => {
      return [...action.payload];
    },
  },
});

const { reducer } = draftSlice;
export default reducer;