import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import UserServiceService from "../services/UserService";

const initialState = {
  isLoggedIn: false,
};

// export const fetchDraftStatus = createAsyncThunk(
//   "Draft/GetDraftStatus",
//   async (data) => {
//     const res = await DraftDataService.getDraftStatus(data);
//     return res.data;
//   }
// );

export const loginUser = createAsyncThunk(
  "User/Login",
  async (data) => {
    const res = await UserServiceService.userLogin(data);
    return res.data;
  }
);

const userLoginSlice = createSlice({
  name: "userInfoStatus",
  initialState,
  extraReducers: {
    [loginUser.fulfilled]: (state, action) => {
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

const { reducer } = userLoginSlice;
export default reducer;