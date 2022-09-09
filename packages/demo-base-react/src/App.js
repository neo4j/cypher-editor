import React from "react";

const App = (props) => {
  const { codemirrorVersion, framework, bundler, children } = props
  return (
    <main>
      <h1>Cypher Codemirror {codemirrorVersion} {framework} {bundler}</h1>
      <div className="card">
        {children}
      </div>
    </main>
  );
};

export default App;
