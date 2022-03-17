import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

const _Nav = ({cars, employees}) => {
  const inventory = cars.filter(car => !car.sold);
  const sales = cars.filter(car => car.sold)
  return (
    <nav className='navContainer'>
      <ul className='nav'>
        <li><Link to='/inventory'>Available Inventory ({inventory.length})</Link></li>
        <li><Link to='/employees'>Employees ({employees.length})</Link></li>
        <li><Link to='/sales'>Past Sales ({sales.length})</Link></li>
      </ul>
    </nav>
  )
};

const mapStateToProps = state => state;

const Nav = connect(mapStateToProps)(_Nav)

export default Nav