import {
  createSlice,
  createSelector,
  createAsyncThunk,
  createEntityAdapter,
} from '@reduxjs/toolkit'
// import { client } from '../../api/client'

const playersAdapter = createEntityAdapter()

// const GET_PLAYERS = "/Player/GetPlayers";

const initialState = playersAdapter.getInitialState({
  status: 'idle',
})

// Thunk functions
export const fetchPlayers = createAsyncThunk('players/fetchPlayers', async () => {
  // const response = await client.get(GET_PLAYERS)
  // return response.players
})

// export const saveNewTodo = createAsyncThunk(
//   'todos/saveNewTodo',
//   async (text) => {
//     const initialTodo = { text }
//     const response = await client.post('/fakeApi/todos', { todo: initialTodo })
//     return response.todo
//   }
// )

const playersSlice = createSlice({
  name: 'players',
  initialState,
  reducers: {
    todoToggled(state, action) {
      const playerId = action.payload
      const player = state.entities[playerId]
      player.completed = !player.completed
    },
    todoColorSelected: {
      reducer(state, action) {
        const { color, todoId } = action.payload
        state.entities[todoId].color = color
      },
      prepare(todoId, color) {
        return {
          payload: { todoId, color },
        }
      },
    },
    // todoDeleted: playersAdapter.removeOne,
    // allTodosCompleted(state, action) {
    //   Object.values(state.entities).forEach((todo) => {
    //     todo.completed = true
    //   })
    // },
    // completedTodosCleared(state, action) {
    //   const completedIds = Object.values(state.entities)
    //     .filter((todo) => todo.completed)
    //     .map((todo) => todo.id)
    //     playersAdapter.removeMany(state, completedIds)
    // },
  },
  extraReducers: (builder) => {
    // builder
      // .addCase(fetchTodos.pending, (state, action) => {
      //   state.status = 'loading'
      // })
      // .addCase(fetchTodos.fulfilled, (state, action) => {
      //   playersAdapter.setAll(state, action.payload)
      //   state.status = 'idle'
      // })
      // .addCase(saveNewTodo.fulfilled, playersAdapter.addOne)
  },
})

export const {
  // allTodosCompleted,
  // completedTodosCleared,
  // todoAdded,
  todoColorSelected,
  // todoDeleted,
  todoToggled,
} = playersSlice.actions

export default playersSlice.reducer

export const {
  selectAll: selectPlayers,
  selectById: selectPlayerById,
} = playersAdapter.getSelectors((state) => state.players)

export const selectPlayerIds = createSelector(
  // First, pass one or more "input selector" functions:
  selectPlayers,
  // Then, an "output selector" that receives all the input results as arguments
  // and returns a final result value
  (players) => players.map((player) => player.id)
)

// export const selectFilteredTodos = createSelector(
//   // First input selector: all todos
//   selectTodos,
//   // Second input selector: all filter values
//   (state) => state.filters,
//   // Output selector: receives both values
//   (todos, filters) => {
//     const { status, colors } = filters
//     const showAllCompletions = status === StatusFilters.All
//     if (showAllCompletions && colors.length === 0) {
//       return todos
//     }

//     const completedStatus = status === StatusFilters.Completed
//     // Return either active or completed todos based on filter
//     return todos.filter((todo) => {
//       const statusMatches =
//         showAllCompletions || todo.completed === completedStatus
//       const colorMatches = colors.length === 0 || colors.includes(todo.color)
//       return statusMatches && colorMatches
//     })
//   }
// )

// export const selectFilteredTodoIds = createSelector(
//   // Pass our other memoized selector as an input
//   selectFilteredTodos,
//   // And derive data in the output selector
//   (filteredTodos) => filteredTodos.map((player) => player.id)
// )
