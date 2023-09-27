import { configureStore } from '@reduxjs/toolkit'

import playerReducer from '../slices/players';
import leagueReducer from '../slices/league';
import draftStatusReducer from '../slices/draftStatus';
import draftReducer from '../slices/draft';

const reducer = {
  draftStatus: draftStatusReducer
  , players: playerReducer
  , activeLeague: leagueReducer
  , draftPicks: draftReducer
}

const store = configureStore({
  reducer: reducer,
  devTools: true,
})

export default store;