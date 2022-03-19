import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import carReducer from './carStore';
import employeeReducer from './employeeStore';
import { singleEmployeeReducer } from './employeeStore';

const rootReducer = combineReducers({
  cars: carReducer,
  employees: employeeReducer,
  singleEmployee: singleEmployeeReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk, logger));

export default store;
