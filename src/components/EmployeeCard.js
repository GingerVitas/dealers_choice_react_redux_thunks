import React from 'react';

const EmployeeCard = ({employee}) => {
  const sales = employee.sales
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  })
  return (
    <div className='employeeCard'>
      <div className='employeeAvatar'>{employee.imageUrl}</div>
      <div className='employeeName'>{employee.firstName} {employee.lastName}</div>
      <div className='employeeEmail'>{employee.email}</div>
      <div className='employeePhone'>{employee.phone}</div>
      {employee.sales.length === 0 ? <div className='employeeNumbers'>I'm new here. Help me build my portfolio!</div> : <div className='employeeNumbers'>I've sold {sales.length} cars this year, for a total of {formatter.format(salesNumbers)}!!</div> }
      {employee.sales.length > 0 ? <div className='employeeSales'>View my sales here!</div> : <div className='employeeSales'>Buy a car from me here!</div>}
    </div>
  )
}

export default EmployeeCard