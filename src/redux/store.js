import { configureStore } from '@reduxjs/toolkit'

import playerReducer from '../slices/players';

const reducer = {
  players: playerReducer
}

const store = configureStore({
  reducer: reducer,
  devTools: true,
})

export default store;