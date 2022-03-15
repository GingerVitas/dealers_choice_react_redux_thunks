import { createStore, combineReducers, applyMiddleware } from 'redux';
import axios from 'axios';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

//Action Types
const LOAD = 'LOAD';
const CREATE = 'CREATE';
const DELETE = 'DELETE';
const SET_VIEW = 'SET_VIEW';

//Actions
const _setView = (view) => {
  return {
    type: SET_VIEW,
    view
  };
};

const _loadCars = (cars) => {
  return {
    type: LOAD,
    cars
  };
};

const _loadEmployees = (employees) => {
  return {
    type: LOAD,
    employees
  };
};

const setView = view => {
  return (dispatch) => {
    return dispatch(_setView(view))
  };
};

const loadCars = () => {
  return async(dispatch) => {
    const cars = (await axios.get('/api/cars')).data;
    dispatch(_loadCars(cars));
  };
};

const loadEmployees = () => {
  return async(dispatch) => {
    const employees = (await axios.get('/api/employees')).data;
    dispatch(_loadEmployees(employees));
  };
};

//Reducers
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
  return state;
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
  return state;
};

const viewReducer = (state = '', action) => {
  if(action.type === SET_VIEW) {
    return action.view;
  };
  return state;
};

const reducer = combineReducers({
  cars: carReducer, 
  employees: employeeReducer,
  view: viewReducer
});

//Store
const store = createStore(reducer, applyMiddleware(thunk, logger));

export default store

export {
  setView,
  loadCars,
  loadEmployees
}