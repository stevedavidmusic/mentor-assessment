// deconstructing createStore method from redux package
// this allows us to export the creation of our store

import { createStore, applyMiddleware } from "redux";
import reducer from "./reducer";
import promiseMiddleware from "redux-promise-middleware";

let middleware = [promiseMiddleware];

export default createStore(reducer, undefined, applyMiddleware(...middleware));
