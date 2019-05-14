import React, { Component } from "react";
import axios from "axios";
import "./App.css";
import Master from "./Components/Master/Master";
import ToDo from "./Components/ToDo/ToDo";
import { connect } from "react-redux";
import { update_list } from "./redux/reducer";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <Master/>
      </div>
    );
  }
}

export default App;
