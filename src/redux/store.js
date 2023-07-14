import { configureStore } from '@reduxjs/toolkit'

// import counterReducer from '../features/counter/counterSlice'
import playerReducer from '../slices/players';

const reducer = {
  players: playerReducer
}

// export default configureStore({
//   reducer: {
//     counter: counterReducer,
//   },
// })

const store = configureStore({
  reducer: reducer,
  devTools: true,
})

export default store;