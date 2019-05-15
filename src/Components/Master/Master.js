import React, { Component } from "react";
import axios from "axios";
import "../../App.css";
import ToDo from "../ToDo/ToDo";
import { connect } from "react-redux";
import { add_task, complete_task, delete_task, get_tasks } from "../../redux/reducer";
import "./master.css";

class Master extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      input: "",
      description: "",
      count: 0
    };
    this.createToDo = this.createToDo.bind(this);
  }

  componentWillMount = () => {
    this.props.get_tasks().then((response) =>{
      this.setState({
        list: response.value
      })
    })
  }

  componentDidUpdate = (prevProps) =>{
    if (this.props.list !== prevProps.list) {
      this.setState({
        list: this.props.list
      })
    }
  }

  handleInputChange = value => {
    this.setState({ input: value });
  };

  handleDescriptionChange = value => {
    this.setState({ description: value });
    // console.log("DESCRIPTOIN VALUE", this.state.description)
  };


  handleAddTask = () => {
    if (this.state.input == "") {
      alert("NEEDS MORE COWBELL");
    } else {
      console.log("ADDING DESCRIPTION:", this.state.description)
      const newTask = {
        text: this.state.input,
        description: "",
        key: this.state.count++,
        completed: false
      };
      // console.log("ADD NEW TASK PROPS", this.props)
      this.props.add_task(newTask);
      this.setState({
        list: this.props.list,
        input: "",
        description: ""
      })
      console.log("GET MORE TASKS")
      this.props.get_tasks()
    }
  };

  completeTask = key => {
    let copyList = [...this.state.list];
    for (let i = copyList.length - 1; i >= 0; i--) {
      if (copyList[i].key === key) {
        copyList[i].completed = true;
      }
    }
    this.props.complete_task(copyList);
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
      this.props.delete_task(copyList);
      this.setState({
        list: copyList
      });
    }
  };

  createToDo(){
    var strikeThrough = {
      textDecoration: "line-through",
      color: "red"
    };
      return this.props.list.map((element, index) => {
      // console.log("MAPPING!")
      return (
        <ToDo
          status={element.completed}
          list={/*this.state.list*/ this.state.list}
          key={index}
          task={element}
          completed={this.state.completed}
          completeTask={this.completeTask}
          delete={this.deleteTask}
          style={strikeThrough}
        />
      );
    });

  }

  render() {

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
            <button onClick={(e) => this.handleAddTask(e)}>Add</button>
          </div>
        </div>
        <br />
        {this.createToDo()}
      </div>
    );
  }
}

const mapStateToProps = reducerState => {
  // console.log("reducerState:", reducerState);
  return {
    list: reducerState.list
  };
};

export default connect(
  mapStateToProps,
  {
    add_task,
    complete_task,
    delete_task,
    get_tasks
  }
)(Master);
