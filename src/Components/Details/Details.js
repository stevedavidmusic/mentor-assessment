import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  get_tasks,
  delete_task,
  complete_task,
  edit_title
} from "../../redux/reducer";
import { connect } from "react-redux";

class Details extends Component {
  constructor(props) {
    super(props);
    this.state = {
      task: this.props.list,
      description: "",
      edit_name_input: "",
      edit_description_input: "",
      edit_title: false,
      edit_description: false
    };
  }

  componentDidMount() {
    this.props.get_tasks().then(response => {
      setTimeout(() => {
        this.setState({
          task: response.value.filter(
            task => task.id == this.props.match.params.id
          )[0]
        });
      }, 200);
    });
  }

  editNameInput = value => {
    this.setState({
      edit_name_input: value
    });
  };

  editDescriptionInput = value => {
    this.setState({
      edit_description_input: value
    });
  };

  toggleTitle = () => {
    if (this.state.edit_title === false) {
      this.setState({
        edit_title: true
      });
    } else if (this.state.edit_title === true) {
      this.setState({
        edit_title: false
      });
    }
  };

  completeTask = id => {
    this.props.complete_task(id);
    this.props.history.push("/");
  };

  deleteTask = id => {
    this.props.delete_task(id);
    this.props.history.push("/");
  };

  editTitle = () => {
    console.log("EDIT TITLE START");
    if (this.state.edit_name_input === "") {
      alert("NEEDS MORE COWBELL");
    } else {
      this.props.edit_title(this.state.task.id, this.state.edit_name_input, this.state.edit_description_input);
      this.props.history.push("/");
    }
  };

  render() {
    // console.log("RENDER TASK", this.state.task);
    // console.log("TEST TEXT", this.state.task);
    return (
      <div>
        <Link to="/">
          <button>Back</button>
        </Link>
        <div>
          {!this.state.edit_title ? (
            <div className="Details__editFalse">
              <h2>Task: {this.state.task.title}</h2>
              <div className="Details__buttons">
                <button onClick={() => this.completeTask(this.state.task.id)}>
                  Complete
                </button>
                <button onClick={() => this.deleteTask(this.state.task.id)}>
                  Delete
                </button>
              </div>
              <div className="Details__description">
                <h2>Description: {this.state.task.description}</h2>
              </div>
              <div className="Details__descriptionButtons">
                <button onClick={this.toggleTitle}>Edit</button>
                <button>Save</button>
              </div>
            </div>
          ) : (
            <div className="Details__editTrue">
              <input
                onChange={e => this.editNameInput(e.target.value)}
                placeholder="Edit Name"
              />
              <input onChange={e => this.editDescriptionInput(e.target.value)} placeholder="Edit Description"/>
              <button onClick={this.editTitle}>Submit</button>
              <button onClick={this.toggleTitle}>Cancel</button>
            </div>
          )}
        </div>
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
  { get_tasks, delete_task, complete_task, edit_title }
)(Details);
