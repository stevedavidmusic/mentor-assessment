const initialState = {
  list: []
};

const ADD_TASK = "ADD_TASK";
const COMPLETE_TASK = "COMPLETE_TASK"
const DELETE_TASK = "DELETE_TASK"

function reducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TASK:
      state.list.push(action.payload);
      return { ...state };
    case COMPLETE_TASK:
      state.list.push(action.payload);
      return{ ...state }
    case DELETE_TASK:
      state.list.push(action.payload)
    default:
      return state;
  }
}

export function add_task(list) {
  console.log("REDUX FIRED(update_list)", initialState.list);
  return {
    type: ADD_TASK,
    payload: list
  };
}

export function complete_task(list){
  console.log("REDUX COMPLETE TASK FIRED")
  return {
    type: complete_task,
    payload: list
  }
}

export function delete_task(list){
  console.log("REDUX DELETE TASK FIRED")
  return {
    type: delete_task,
    payload: list
  }
}

export default reducer;
