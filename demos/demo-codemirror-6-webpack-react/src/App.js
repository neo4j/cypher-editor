import React from "react";

import { App as AppBase, Database } from "demo-base-react";
import { CypherEditor } from "@neo4j-cypher/react-codemirror";

const App = () => {
  return (
    <AppBase>
      <Database
        codemirrorVersion="6"
        framework="react"
        bundler="webpack"
        CypherEditor={CypherEditor}
      />
    </AppBase>
  );
};

export default App;
