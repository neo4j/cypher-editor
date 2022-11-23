import React from "react";
// import { render } from "react-dom";
import { createRoot } from "react-dom/client";

import "demo-base/css/app.css";
import App from "./App";

// render(<App />, document.getElementById("app"));
const root = createRoot(document.getElementById("app"));
root.render(<App />);
