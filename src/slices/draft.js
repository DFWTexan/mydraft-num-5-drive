import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import DraftDataService from "../services/DraftService";

const initialState = [];

export const fetchDraftedPlayers = createAsyncThunk(
  "Draft/GetDraftPicksForLeague",
  async () => {

console.log('===> EMFTEST - GOT HERE (getDraftSelections)... ');

    const res = await DraftDataService.getDraftSelections();

console.log('===> EMFTEST - res: ', res.data);

    return res.data;
  }
);

const draftSlice = createSlice({
  name: "draftSelections",
  initialState,
  extraReducers: {
    // [createTutorial.fulfilled]: (state, action) => {
    //   state.push(action.payload);
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