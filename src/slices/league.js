import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import LeagueDataService from "../services/LeagueService";

const initialState = {};

export const fetchActiveLeague = createAsyncThunk(
  "League/GetActiveLeague",
  async (id) => {
    const res = await LeagueDataService.getActiveLeague(id);
    return res.data;
  }
);

const leagueSlice = createSlice({
  name: "league",
  initialState,
  extraReducers: {
    // [createTutorial.fulfilled]: (state, action) => {
    //   state.push(action.payload);
    // },
    [fetchActiveLeague.fulfilled]: (state, action) => {
      return {...action.payload};
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

const { reducer } = leagueSlice;
export default reducer;