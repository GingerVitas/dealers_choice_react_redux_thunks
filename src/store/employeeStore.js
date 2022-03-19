import axios from 'axios';

const LOAD_EMPLOYEES = 'LOAD_EMPLOYEES';
const CREATE_EMPLOYEE = 'CREATE_EMPLOYEE';
const DELETE_EMPLOYEE = 'DELETE_EMPLOYEE';
const SET_SINGLE_EMPLOYEE = 'SET_SINGLE_EMPLOYEE';

export const _loadEmployees = (employees) => {
  return {
    type: LOAD_EMPLOYEES,
    employees
  };
};

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

const _setSingleEmployee = (employee) => {
  return {
    type: SET_SINGLE_EMPLOYEE,
    employee
  }
}

//Thunks
const loadEmployees = () => {
  return async(dispatch) => {
    const employees = (await axios.get('/api/employees')).data;
    dispatch(_loadEmployees(employees));
  };
};

const fireEmployee = (employee, history) => {
  return async(dispatch) => {
    await axios.delete(`/api/employees/${employee.id}`);
    dispatch(destroyEmployee(employee));
    history.push('/employees')
  }
};

const hireEmployee = (history) => {
  return async(dispatch) => {
    const newEmployee = (await axios.post('/api/employees')).data;
    dispatch(createEmployee(newEmployee));
    history.push(`/employees/${newEmployee.id}`)
  }
}

const setSingleEmployee = (id) => {
  return async(dispatch) => {
    const employee = (await axios.get(`/api/employees/${id}`)).data;
    dispatch(_setSingleEmployee(employee))
  }
}

//reducers
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

export default employeeReducer

export {
  singleEmployeeReducer,
  loadEmployees,
  hireEmployee,
  fireEmployee,
  setSingleEmployee
}