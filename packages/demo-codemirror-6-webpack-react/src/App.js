import React from "react";

import Database from "./components/Database";
import "./app.css";

const App = () => {
  return (
    <main>
      <h1>Cypher Codemirror 6</h1>

      <div className="card">
        <Database />
      </div>
    </main>
  );
};

export default App;
