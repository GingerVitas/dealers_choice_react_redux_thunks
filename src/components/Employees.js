import React from 'react';
import {connect} from 'react-redux'
import {Link} from 'react-router-dom';
import { hireEmployee } from '../store';

const _Employees = (props) => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  });
  console.log(props)
  const employees = props.employees;
  const hireEmployee = props.hireEmployee;
  return (
    <div>
      <table className='employeeTable'>
        <tbody>
          <tr>
            <th>Employee Name</th>
            <th>Employee Email</th>
            <th>Cars Sold</th>
            <th>Lifetime Sales</th>
          </tr>
          { employees.map(employee => {
            return (
              <tr key={employee.id}>
                <td><Link to={`/employees/${employee.id}`}>{employee.firstName} {employee.lastName}</Link></td>
                <td>{employee.email}</td>
                <td>{employee.sales.length}</td>
                <td>{formatter.format(employee.sales.reduce((a, b) => a+(b.salePrice), 0))}</td>
              </tr>
            )}) }
        </tbody>
      </table>
      <div>
        <p>Feeling understaffed? Let's hire some new team members!</p>
        <button onClick={()=> hireEmployee()}>Hire someone!</button>
      </div>
    </div>
  );
};

const mapStateToProps = state => state;

const mapDispatchToProps = (dispatch, {history}) => {
  return {
    hireEmployee: () => dispatch(hireEmployee())
  }
}

const Employees = connect(mapStateToProps, mapDispatchToProps)(_Employees);

export default Employees;