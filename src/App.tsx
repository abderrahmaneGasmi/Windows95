import { useState } from "react";
import "./App.css";
import Startbar from "./components/Startbar";
import Icons from "./components/Icons";

function App() {
  return (
    <>
      <div className="main">
        <div className="container">
          <Icons />
        </div>
        <Startbar />
      </div>
    </>
  );
}

export default App;
