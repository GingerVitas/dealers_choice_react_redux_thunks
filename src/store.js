import { createStore, combineReducers, applyMiddleware } from 'redux';
import axios from 'axios';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

//Action Types
const LOAD_CARS = 'LOAD_CARS';
const CREATE_CAR = 'CREATE_CAR';
const DELETE_CAR = 'DELETE_CAR';
const LOAD_EMPLOYEES = 'LOAD_EMPLOYEES';
const CREATE_EMPLOYEE = 'CREATE_EMPLOYEE';
const DELETE_EMPLOYEE = 'DELETE_EMPLOYEE';
const SET_VIEW = 'SET_VIEW';
const SET_SINGLE_EMPLOYEE = 'SET_SINGLE_EMPLOYEE';

//Action Creators
const _setView = (view) => {
  return {
    type: SET_VIEW,
    view
  };
};

const _loadCars = (cars) => {
  return {
    type: LOAD_CARS,
    cars
  };
};

const _loadEmployees = (employees) => {
  return {
    type: LOAD_EMPLOYEES,
    employees
  };
};

const _setSingleEmployee = (employee) => {
  return {
    type: SET_SINGLE_EMPLOYEE,
    employee
  }
}

//Actions
const setView = view => {
  return (dispatch) => {
    dispatch(_setView(view))
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

const setSingleEmployee = (id) => {
  return async(dispatch) => {
    const employee = (await axios.get(`/api/employees/${id}`)).data;
    dispatch(_setSingleEmployee(employee))
  }
}

//Reducers
const carReducer = (state = [], action) => {
  if(action.type === LOAD_CARS) {
    return action.cars;
  };
  if(action.type === CREATE_CAR) {
    return [...state, action.car];
  };
  if(action.type === DELETE_CAR) {
    return state.filter(car => car.id !== action.car.id)
  };
  return state;
};``

const employeeReducer = (state = [], action) => {
  if(action.type === LOAD_EMPLOYEES) {
    return action.employees;
  };
  if(action.type === CREATE_EMPLOYEE) {
    return [...state, action.employee];
  };
  if(action.type === DELETE_EMPLOYEE) {
    return state.filter(employee => employee.id !== action.employee.id);
  };
  return state;
};

const singleEmployeeReducer = (state = {}, action) => {
  if(action.type === SET_SINGLE_EMPLOYEE) {
    return action.employee
  };
  return state;
}

const viewReducer = (state = '', action) => {
  if(action.type === SET_VIEW) {
    return action.view;
  };
  return state;
};

const reducer = combineReducers({
  cars: carReducer, 
  employees: employeeReducer,
  view: viewReducer,
  singleEmployee: singleEmployeeReducer
});

//Store
const store = createStore(reducer, applyMiddleware(thunk, logger));

export default store

export {
  setView,
  loadCars,
  loadEmployees,
  setSingleEmployee
}