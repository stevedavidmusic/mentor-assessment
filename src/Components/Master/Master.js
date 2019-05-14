import React, { Component } from "react";
import axios from "axios";
import "../../App.css";
import ToDo from "../ToDo/ToDo";
import { connect } from "react-redux";
import { add_task, complete_task, delete_task } from "../../redux/reducer";
import './master.css'

class Master extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: this.props.list,
      input: "",
      count: 0
    };
  }

  handleInputChange = value => {
    this.setState({ input: value });
  };

  // handleAddTask = () => {
  //   if (this.state.input == "") {
  //     alert("NEEDS MORE COWBELL");
  //   } else {
  //     const newTask = {
  //       text: this.state.input,
  //       key: this.state.count++,
  //       completed: false
  //     };
  //     this.setState({
  //       list: [...this.state.list, newTask],
  //       input: "",
  //       count: this.state.count + 1
  //     });
  //   }
  // };

  handleAddTask = () => {
    if (this.state.input == "") {
      alert("NEEDS MORE COWBELL");
    } else {
      const newTask = {
        text: this.state.input,
        key: this.state.count++,
        completed: false
      };
      this.props.add_task(newTask)
      console.log("THIS.PROPS.LIST:", this.props.list)
      console.log("THIS.STATE AFTERMATH:", this.state)
      this.setState({
        list: this.props.list 
      })
      // this.setState({
      //   list: [...this.props.list, newTask],
      //   input: "",
      //   count: this.state.count + 1
      // });
    }
  };

  completeTask = key => {
    let copyList = [...this.state.list];
    for (let i = copyList.length - 1; i >= 0; i--) {
      if (copyList[i].key === key) {
        copyList[i].completed = true;
      }
    }
    this.props.complete_task(copyList)
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
      this.props.delete_task(copyList)
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
      // console.log(
      //   "LIST",
      //   this.state.list,
      //   this.state.list[0],
      //   "COMPLETED?",
      //   element.completed
      // );

      return (
        <ToDo
          status={element.completed}
          list={/*this.state.list*/ this.props.list}
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
      <div className="Master">
        <div className="Master__text">
          <h1>Bro, do you even list?</h1>
        </div>
        <div className="Master__add">
          <div className="Master__input">
          <input
            value={this.state.input}
            placeholder="Enter new task"
            onChange={e => this.handleInputChange(e.target.value)}
          />
          </div>
          <div className="Master__addButton">
          <button onClick={this.handleAddTask}>Add</button>
          </div>
        </div>
        <br />
        {list}
      </div>
    );
  }
}

const mapStateToProps = reducerState => {
  console.log("reducerState:", reducerState)
  return {
    list: reducerState.list
  };
};

export default connect(
  mapStateToProps,
  {
    add_task,
    complete_task,
    delete_task
  }
)(Master);

