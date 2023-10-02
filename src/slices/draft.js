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
    // [fetchDraftStatus.fulfilled]: (state, action) => {
    //   return [...action.payload];
    // },
    [fetchDraftedPlayers.fulfilled]: (state, action) => {
      return [...action.payload];
    },
    // [updateTutorial.fulfilled]: (state, action) => {
    //   const index = state.findIndex(tutorial => tutorial.id === action.payload.id);
    //   state[index] = {
    //     ...state[index],
    //     ...action.payload,
    //   };
    // },
    // [deleteTutorial.fulfilled]: (state, action) => {
    //   let index = state.findIndex(({ id }) => id === action.payload.id);
    //   state.splice(index, 1);
    // },
    // [deleteAllTutorials.fulfilled]: (state, action) => {
    //   return [];
    // },
    // [findTutorialsByTitle.fulfilled]: (state, action) => {
    //   return [...action.payload];
    // },
  },
});

const { reducer } = draftSlice;
export default reducer;