import React from 'react';
import {connect} from 'react-redux';

const _Nav = ({view, cars, employees}) => {
  const inventory = cars.filter(car => !car.sold);
  const sales = cars.filter(car => car.sold)
  return (
    <nav>
      <ul className='nav'>
        <li><a href='#' className={view === 'inventory' ? 'selected' : ''}>Available Inventory ({inventory.length})</a></li>
        <li><a href='#employees' className={ view === 'employees' ? 'selected' : ''}>Employees ({employees.length})</a></li>
        <li><a href='#sales' className={ view === 'sales' ? 'selected' : ''}>Past Sales ({sales.length})</a></li>
      </ul>
    </nav>
  )
};

const mapStateToProps = state => state;

const Nav = connect(mapStateToProps)(_Nav)

export default Nav