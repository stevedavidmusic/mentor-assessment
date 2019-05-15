import React from "react";
import { Link } from "react-router-dom";
import "./toDo.css";

export default function Todo(props) {
  // console.log("TODO PROPS:", props);
  // console.log("DESCRIPTION", props.description)
  return (
    <div className="ToDo__container">
      <div key={props.task.key} className="ToDo__task">
        <div className="ToDo__taskName">
          <h3 style={props.status ? props.style : null}>{props.task.title}</h3>
          {/* <h3 style={props.status ? props.style : null}>{props.list[props.key].title}</h3> */}
          <Link to={`/details/${props.task.id}`}>
          <button>Details</button>
        </Link>

        </div>
        {/* {props.status ? (<div></div>) : (<button
          onClick={() => {
            props.completeTask(props.task.key);
          }}
        >
          Complete
        </button>)
        }
        <button
          onClick={() => {
            props.delete(props.task.key);
          }}
        >
          Delete
        </button> */}
      </div>
    </div>
  );
}
