import React from 'react';
import {connect} from 'react-redux';
import { setSingleEmployee } from '../store';

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
    const employee = this.props.singleEmployee;
    const sales = employee.sales;
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    })
    if(!employee.id){ return null;}
    return (
      <div>
        <div className='employeeCard'></div>
        <div className='employeeAvatar'><img src={employee.imageUrl} /></div>
        <div className='employeeName'>{employee.firstName} {employee.lastName}</div>
        <div className='employeeEmail'>{employee.email}</div>
        <div className='employeePhone'>{employee.phone}</div>
        <div className='employeeNumbers'>I've sold {sales.length} cars this year, for a total of {formatter.format(sales.reduce((a,b)=>a+b.salePrice,0))}!!</div>
        <div className='employeeSales'>View my sales here!</div>
      </div>
    )
  };
}

const mapStateToProps = state => ({singleEmployee: state.singleEmployee});

const mapDispatchToProps = (dispatch) => {
  return {
    loadEmployee: (id) => dispatch(setSingleEmployee(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleEmployee)
