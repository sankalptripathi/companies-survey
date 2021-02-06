import React, { Fragment } from "react";
import ReactDOM from "react-dom";

import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/css/bootstrap-grid.min.css";
import "./App.css";
import Checkbox from "./components/Checkbox";

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return ( 
      <div className="page">
        <Checkbox/>      
      </div>
    );
  }
}

export default App;
