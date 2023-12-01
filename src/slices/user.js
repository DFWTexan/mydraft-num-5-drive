import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import UserServiceService from "../services/UserService";

const getToken = () => {
  let userObject = JSON.parse(localStorage.getItem("user")); // Retrieve the user object from local storage
  let token = userObject ? userObject.token : null; // Extract the token from the user object
  return token;
};

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

// export const loginUser = createAsyncThunk(
//   "User/UserInfoStatus",
//   async (data) => {
//     const res = await UserServiceService.userLogin(data);
//     return res.data;
//   }
// );

export const userInfoStatus = createAsyncThunk(
  "User/UserInfoStatus",
  async (_, { rejectWithValue }) => {
    try {
      const token = getToken(); // Retrieve the token
      const res = await UserServiceService.UserInfoStatus({ // Removed the data parameter
        headers: {
          Authorization: `Bearer ${token}` // Include the token in the request headers
        }
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const userLoginSlice = createSlice({
  name: "userInfoStatus",
  initialState,
  extraReducers: {
    [userInfoStatus.fulfilled]: (state, action) => {
      return { ...action.payload };
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
