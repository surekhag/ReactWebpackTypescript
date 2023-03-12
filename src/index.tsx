import React from "react";
import ReactDOM from "react-dom";
import configData from "configData"
const App = () => {
  console.log("configData",configData)
  return (
  <h1>My React and TypeScript App along with Webpack 5!</h1>
  )
};

ReactDOM.render(
  <App />,
  document.getElementById("root")
);