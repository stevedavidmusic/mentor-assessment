import React from "react";
import "./toDo.css";

export default function Todo(props) {
  return (
    <div className="ToDo__container">
      <div key={props.task.key} className="ToDo__task">
        <div className="ToDo__taskName">
          <h3 style={props.status ? props.style : null}>{props.task.text}</h3>
        </div>
        {props.status ? (<div></div>) : (<button
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
        </button>
      </div>
    </div>
  );
}
