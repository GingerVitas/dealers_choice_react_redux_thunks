import axios from 'axios';
import { _loadEmployees } from './employeeStore';

const LOAD_CARS = 'LOAD_CARS';
const CREATE_CAR = 'CREATE_CAR';
const DELETE_CAR = 'DELETE_CAR';
const UPDATE_CAR = 'UPDATE_CAR';

const _loadCars = (cars) => {
  return {
    type: LOAD_CARS,
    cars
  };
};

const _buyCar = (car) => {
  return {
    type: UPDATE_CAR,
    car
  }
}

const _createCar = (car) => {
  return {
    type: CREATE_CAR,
    car
  }
}

//Thunks
const loadCars = () => {
  return async(dispatch) => {
    const cars = (await axios.get('/api/cars')).data;
    dispatch(_loadCars(cars));
  };
};

const buyCar = (car, history) => {
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

const createCar = (car, history) => {
  return async(dispatch) => {
    const newCar = (await axios.post('/api/cars', car)).data;
    dispatch(_createCar(newCar))
    history.push('/inventory')
  }
}

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
};

export default carReducer;

export {
  buyCar,
  loadCars,
  createCar
}