import React, { Fragment } from "react";

const App = (props) => {
  const { children } = props;

  return <Fragment>{children}</Fragment>;
};

export default App;
