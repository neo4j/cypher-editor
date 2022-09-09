import React from "react";

import { App as AppBase, Database } from "demo-base-react";
import CypherEditor from "react-codemirror5-cypher";

const App = () => {
  return (
    <AppBase codemirrorVersion="5" framework="react" bundler="webpack">
      <Database CypherEditor={CypherEditor} />
    </AppBase>
  );
};

export default App;
