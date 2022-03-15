import { createStore, combineReducers, applyMiddleware } from 'redux';
import axios from 'axios';
import thunk from 'thunk';
import logger from 'redux-logger';

//Action Types
const LOAD = 'LOAD';
const CREATE = 'CREATE';
const DELETE = 'DELETE';
const SET_VIEW = 'SET_VIEW'

const carReducer = (state = [], action) => {
  if(action.type === LOAD) {
    return action.cars;
  };
  if(action.type === CREATE) {
    return [...state, action.car];
  };
  if(action.type === DELETE) {
    return state.filter(car => car.id !== action.car.id)
  };
};

const employeeReducer = (state = [], action) => {
  if(action.type === LOAD) {
    return action.employees;
  };
  if(action.type === CREATE) {
    return [...state, action.employee];
  };
  if(action.type === DELETE) {
    return state.filter(employee => employee.id !== action.employee.id);
  };
};

const viewReducer = (state = '', action) => {
  if(action.type === SET_VIEW) {
    return action.view;
  };
};

const reducer = combineReducers({
  cars:carReducer, 
  employees: employeeReducer,
  view: viewReducer
})

const store = createStore(reducer, applyMiddleware(thunk, logger));

export default store