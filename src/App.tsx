import { useState } from "react";
import "./App.css";
import Startbar from "./components/Startbar";

function App() {
  return (
    <>
      <div className="main">
        <div className="container"></div>
        <Startbar />
      </div>
    </>
  );
}

export default App;
