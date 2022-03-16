import React from 'react';
import {connect} from 'react-redux'
import {Link} from 'react-router-dom';

const _Employees = ({employees}) => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  });

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
            const employeeSales = employee.sales.reduce((a, b) => a+(b.salePrice), 0)
            return (
              <tr key={employee.id}>
                <td><Link to={`/employees/${employee.id}`}>{employee.firstName} {employee.lastName}</Link></td>
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