import React from "react";
import ReactDOM from "react-dom";
import configs from "configData"
const App = () => {
  console.log("configData",configs)
  return (
  <h1>My React and TypeScript App along with Webpack 5!</h1>
  )
};

ReactDOM.render(
  <App />,
  document.getElementById("root")
);