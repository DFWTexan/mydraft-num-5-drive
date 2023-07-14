import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";

import store from "./redux/store";
// import { fetchPlayers } from "./features/players/playerSlice";

// store.dispatch(fetchPlayers());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
