import axios from "axios";
const taskAPI = "https://practiceapi.devmountain.com/api/tasks/";

const initialState = {
  list: [],
  loading: false
};

const GET_TASKS = "GET_TASKS";
const GET_TASKS_PENDING = "GET_TASKS_PENDING";
const GET_TASKS_FULFILLED = "GET_TASKS_FULFILLED";
const ADD_TASK = "ADD_TASK";
const COMPLETE_TASK = "COMPLETE_TASK";
const DELETE_TASK = "DELETE_TASK";
const EDIT_TITLE = "EDIT TITLE";

function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_TASKS + "_FULFILLED":
      return { list: action.payload };

    case GET_TASKS_PENDING:
      return Object.assign({}, state, { loading: true });

    case GET_TASKS_FULFILLED:
      return Object.assign({}, state, { loading: false });

    case ADD_TASK + "_FULFILLED":
    console.log("ADD TASK DESCRIPTION", action.payload)
      state.list.push(action.payload);
      return { list: action.payload };

    case COMPLETE_TASK + "_FULFILLED":
      return { list: action.payload };

    case DELETE_TASK + "_FULFILLED":
      return { list: action.payload };

    case EDIT_TITLE + "_FULFILLED":
      console.log("EDIT SWITCH ACTIVATED")
      return {list: action.payload}

    default:
      return state;
  }
}

export function get_tasks() {
  const promise = axios.get(taskAPI).then(response => response.data);
  return {
    type: GET_TASKS,
    payload: promise
  };
}

export function add_task(task) {
  console.log("ADD_TASK CHECK", task.description)
  const promise = axios
    .post(taskAPI, {
      title: task.text,
      key: task.key,
      completed: task.completed,
      description: task.description

    })
    .then(response => response.data);
    console.log("AFTERMATH", task)
  return {
    type: ADD_TASK,
    payload: promise
  };
}

export function complete_task(id) {
  console.log("REDUX COMPLETE TASK FIRED");
  const promise = axios.put(`https://practiceapi.devmountain.com/api/tasks/${id}`).then( response => response.data );
  return {
    type: COMPLETE_TASK,
    payload: promise
  };
}

export function delete_task(id) {
  const promise = axios
    .delete(`https://practiceapi.devmountain.com/api/tasks/${id}`)
    .then(response => response.data);
  return {
    type: DELETE_TASK,
    payload: promise
  };
}

export function edit_title(id, title, description){
  console.log("REDUX EDIT TITLE")
  const promise = axios.patch(`https://practiceapi.devmountain.com/api/tasks/${id}`, {title: title, description: description}).then(response => response.data)
  return {
    type: EDIT_TITLE,
    payload: promise
  }
}

export default reducer;
