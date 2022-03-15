import React from 'react';
import {connect} from 'react-redux'

const _Employees = ({employees}) => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  });

  return (
    <div className='employeeTable'>
      <table>
        <tbody>
          <tr>
            <th>Employee Name</th>
            <th>Employee Email</th>
            <th>Lifetime Sales</th>
            <th>Total Value</th>
          </tr>
          { employees.map(employee => {
            const employeeSales = employee.sales.reduce((a, b) => a+(b.salePrice), 0)
            return (
              <tr key={employee.id}>
                <td>{employee.firstName} {employee.lastName}</td>
                <td>{employee.email}</td>
                <td>{employee.sales.length}</td>
                <td>{formatter.format(employeeSales)}</td>
              </tr>
            )}) }
        </tbody>
      </table>
    </div>
  );
};

const mapStateToProps = state => state;

const Employees = connect(mapStateToProps)(_Employees);

export default Employees;