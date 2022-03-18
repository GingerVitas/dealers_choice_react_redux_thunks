import { createStore, combineReducers, applyMiddleware } from 'redux';
import axios from 'axios';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

//Action Types
const LOAD_CARS = 'LOAD_CARS';
const CREATE_CAR = 'CREATE_CAR';
const DELETE_CAR = 'DELETE_CAR';
const UPDATE_CAR = 'UPDATE_CAR';
const LOAD_EMPLOYEES = 'LOAD_EMPLOYEES';
const CREATE_EMPLOYEE = 'CREATE_EMPLOYEE';
const DELETE_EMPLOYEE = 'DELETE_EMPLOYEE';
const SET_SINGLE_EMPLOYEE = 'SET_SINGLE_EMPLOYEE';

//Action Creators
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

const _buyCar = (car) => {
  return {
    type: UPDATE_CAR,
    car
  }
}

const _setSingleEmployee = (employee) => {
  return {
    type: SET_SINGLE_EMPLOYEE,
    employee
  }
}

const destroyEmployee = (employee) => {
  return {
    type: DELETE_EMPLOYEE,
    employee
  }
}

const createEmployee = (employee) => {
  return {
    type: CREATE_EMPLOYEE,
    employee
  }
}

//Thunks
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


const buyCar = (car, history) => {
  console.log(history)
  return async(dispatch) => {
    let newCar = (await axios.put(`/api/cars/${car.id}`, {sold: true})).data;
    await axios.post('/api/sales', {newCar});
    newCar = (await axios.get(`/api/cars/${car.id}`)).data;
    const employees = (await axios.get('/api/employees')).data
    dispatch(_buyCar(newCar));
    dispatch(_loadEmployees(employees));
    history.push('/employees');
  }
}

const setSingleEmployee = (id) => {
  return async(dispatch) => {
    const employee = (await axios.get(`/api/employees/${id}`)).data;
    dispatch(_setSingleEmployee(employee))
  }
}

const fireEmployee = (employee, history) => {
  return async(dispatch) => {
    await axios.delete(`/api/employees/${employee.id}`);
    dispatch(destroyEmployee(employee));
    history.push('/employees')
  }
};

const hireEmployee = () => {
  return async(dispatch) => {
    const newEmployee = (await axios.post('/api/employees')).data;
    dispatch(createEmployee(newEmployee));
    // history.push(`/employees/${newEmployee.id}`)
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
  if(action.type === UPDATE_CAR) {
     return [...state.map(car => car.id !== action.car.id ? car : action.car)]
  }
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
    return [...state.filter(employee => employee.id !== action.employee.id)];
  };
  return state;
};

const singleEmployeeReducer = (state = {}, action) => {
  if(action.type === SET_SINGLE_EMPLOYEE) {
    return action.employee
  };
  return state;
}

const reducer = combineReducers({
  cars: carReducer, 
  employees: employeeReducer,
  singleEmployee: singleEmployeeReducer
});

//Store
const store = createStore(reducer, applyMiddleware(thunk, logger));

export default store

export {
  loadCars,
  loadEmployees,
  setSingleEmployee,
  fireEmployee,
  hireEmployee,
  buyCar
}