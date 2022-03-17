import React from 'react';
import {connect} from 'react-redux';
import { setSingleEmployee, fireEmployee } from '../store';
import faker from '@faker-js/faker';

class SingleEmployee extends React.Component {
  componentDidMount() {
    try{
      this.props.loadEmployee(this.props.match.params.id*1)
    }
    catch(ex){
      console.log(ex)
    }
  }
  render() {
    const fireEmployee = this.props.fireEmployee
    const employee = this.props.singleEmployee;
    const sales = employee.sales;
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    })
    if(!employee.id){ return null;}
    return (
      <div>
        <div className='employeeGrid'>
          <div className='employeeCard'>
            <div className='employeeAvatar'><img src={employee.imageUrl} /></div>
            <div className='employeeName'>{employee.firstName} {employee.lastName}</div>
            <div className='companyName'>Salesperson at ACME Used Car Sales</div>
            <div className='employeeEmail'>{employee.email}</div>
            <div className='employeePhone'>{employee.phone}</div>
            <div className='employeeNumbers'>I've sold {sales.length} cars this year, for a total of {formatter.format(sales.reduce((a,b)=>a+b.salePrice,0))}!!</div>
            <div className='employeeSales'>View my sales here!</div>
          </div>
        </div>
        <button className='fireButton' onClick={() => fireEmployee(employee)}>Fire this employee for {faker.random.word()}!</button>
      </div>
    )
  };
}

const mapStateToProps = state => ({singleEmployee: state.singleEmployee || {}});

const mapDispatchToProps = (dispatch, {history}) => {
  return {
    loadEmployee: (id) => dispatch(setSingleEmployee(id)),
    fireEmployee: (employee) => dispatch(fireEmployee(employee, history))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleEmployee)
