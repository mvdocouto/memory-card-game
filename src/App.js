import React from "react";
import { Provider } from "react-redux";

import store from "./store";

import GridCard from "./components/GridCard";
import Header from "./components/Header";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <div>
          <Header/>
          <GridCard />
        </div>
      </div>
    </Provider>
  );
}

export default App;
