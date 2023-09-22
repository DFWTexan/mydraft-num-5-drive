import { configureStore } from '@reduxjs/toolkit'

import playerReducer from '../slices/players';
import leagueReducer from '../slices/league';
import draftReducer from '../slices/draft';

const reducer = {
  players: playerReducer
  , activeLeague: leagueReducer
  , draftSelections: draftReducer
}

const store = configureStore({
  reducer: reducer,
  devTools: true,
})

export default store;