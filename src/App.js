import React, { Component } from "react";
import axios from "axios";
import logo from "./logo.svg";
import "./App.css";
import ToDo from "./Components/ToDo/ToDo";

class App extends Component {
  constructor() {
    super();
    this.state = {
      list: [],
      input: "",
      count: 0
    };
  }

  handleInputChange = value => {
    this.setState({ input: value });
  };

  handleAddTask = () => {
    if (this.state.input == "") {
      alert("NEEDS MORE COWBELL");
    } else {
      const newTask = {
        text: this.state.input,
        key: this.state.count++,
        completed: false
      };
      this.setState({
        list: [...this.state.list, newTask],
        input: "",
        count: this.state.count + 1
      });
    }
  };

  completeTask = key => {
    let copyList = [...this.state.list];
    for (let i = copyList.length - 1; i >= 0; i--) {
      if (copyList[i].key === key) {
        copyList[i].completed = true;
      }
    }
    this.setState({
      list: copyList
    });
  };

  deleteTask = key => {
    let copyList = [...this.state.list];
    for (let i = copyList.length - 1; i >= 0; i--) {
      if (copyList[i].key === key) {
        copyList.splice(copyList.indexOf(copyList[i]), 1);
      }
      this.setState({
        list: copyList
      });
    }
  };

  render() {
    var strikeThrough = {
      textDecoration: "line-through",
      color: "red"
    };
    
    let list = this.state.list.map((element, index) => {
      console.log(
        "LIST",
        this.state.list,
        this.state.list[0],
        "COMPLETED?",
        element.completed
      );

      return (
        <ToDo
          status={element.completed}
          list={this.state.list}
          key={index}
          task={element}
          completed={this.state.completed}
          completeTask={this.completeTask}
          delete={this.deleteTask}
          style={strikeThrough}
        />
      );
    });

    return (
      <div className="App">
        <h1>Bro, do you even list?</h1>
        <div>
          <input
            value={this.state.input}
            placeholder="Enter new task"
            onChange={e => this.handleInputChange(e.target.value)}
          />
          <button onClick={this.handleAddTask}>Add</button>
        </div>
        <br />
        {list}
      </div>
    );
  }
}

export default App;
