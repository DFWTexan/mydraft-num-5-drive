import { configureStore } from '@reduxjs/toolkit'

import userReducer from '../slices/user';
import playerReducer from '../slices/players';
import leagueReducer from '../slices/league';
import draftStatusReducer from '../slices/draftStatus';
import draftReducer from '../slices/draft';
import fanTeamRosterReducer from '../slices/fanTeamRoster';
import draftPickReducer from '../slices/draftedPositions';
import fanTeamRosterCountReducer from '../slices/fanTeamRosterCount';
import fanTeamSelectionsReducer from '../slices/fanTeamSelections';

const reducer = {
  userInfoStatus: userReducer
  , draftStatus: draftStatusReducer
  , players: playerReducer
  , activeLeague: leagueReducer
  , draftPicks: draftReducer
  , fanTeamRoster: fanTeamRosterReducer
  , draftedPositions: draftPickReducer
  , fanTeamRosterCount: fanTeamRosterCountReducer
  , fanTeamSelections: fanTeamSelectionsReducer
}

const store = configureStore({
  reducer: reducer,
  devTools: true,
})

export default store;