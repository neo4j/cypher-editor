import React from "react";

import { App as AppBase, Database } from "demo-base-react";
import CypherEditor from "react-codemirror-cypher";

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
