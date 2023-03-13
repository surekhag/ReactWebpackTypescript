import React from "react";
import { createRoot } from 'react-dom/client';
import configs from "configData";

const App = () => {
  console.log("configData : ",configs)
  return (
  <h1>My React and TypeScript App along with Webpack 5!</h1>
  )
};

const container = document.getElementById('root');
const root = createRoot(container!); 
root.render(<App />);
