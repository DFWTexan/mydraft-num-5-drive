import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import PlayerDataService from "../services/PlayerService";

const initialState = [];

// export const createTutorial = createAsyncThunk(
//   "tutorials/create",
//   async ({ title, description }) => {
//     const res = await TutorialDataService.create({ title, description });
//     return res.data;
//   }
// );

export const fetchPlayers = createAsyncThunk(
  "Player/GetPlayers",
  async (data) => {
    const res = await PlayerDataService.get(data);
    return res.data;
  }
);

// export const updateTutorial = createAsyncThunk(
//   "tutorials/update",
//   async ({ id, data }) => {
//     const res = await TutorialDataService.update(id, data);
//     return res.data;
//   }
// );

// export const deleteTutorial = createAsyncThunk(
//   "tutorials/delete",
//   async ({ id }) => {
//     await TutorialDataService.remove(id);
//     return { id };
//   }
// );

// export const deleteAllTutorials = createAsyncThunk(
//   "tutorials/deleteAll",
//   async () => {
//     const res = await TutorialDataService.removeAll();
//     return res.data;
//   }
// );

export const findTutorialsByTitle = createAsyncThunk(
  "tutorials/findByTitle",
  async ({ title }) => {
    const res = await PlayerDataService.findByTitle(title);
    return res.data;
  }
);

const playerSlice = createSlice({
  name: "players",
  initialState,
  extraReducers: {
    // [createTutorial.fulfilled]: (state, action) => {
    //   state.push(action.payload);
    // },
    [fetchPlayers.fulfilled]: (state, action) => {
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

const { reducer } = playerSlice;
export default reducer;