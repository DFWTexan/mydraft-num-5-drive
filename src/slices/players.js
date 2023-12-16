import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import PlayerDataService from '../services/PlayerService';

const initialState = [];

// Async thunk for fetching players
export const fetchPlayers = createAsyncThunk(
  'Player/GetPlayers',
  async (payload, { rejectWithValue }) => {
    try {
      const res = await PlayerDataService.fetch(payload);
      return res.data;
    } catch (error) {
      // Improved error handling
      return rejectWithValue(error?.response?.data || 'Unknown error');
    }
  }
);

// Player slice
const playerSlice = createSlice({
  name: 'players',
  initialState,
  extraReducers: {
    [fetchPlayers.fulfilled]: (state, action) => {
      return [...action.payload];
    },
    // Handle rejected state
    [fetchPlayers.rejected]: (state, action) => {
      // Handle error state
      console.error('Fetch players failed:', action.payload);
    },
  },
});

const { reducer } = playerSlice;
export default reducer;