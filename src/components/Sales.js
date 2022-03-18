import React from 'react';
import {connect} from 'react-redux';
import SoldCards from './SoldCards';
import {Route} from 'react-router-dom';


const _Sales = ({cars}) => {
  const inventory = cars.filter(car=> car.sold)
  return (
    <div>
      <h3>Available Inventory</h3>
      <div className='grid'>
        <Route component={SoldCards} />
      </div>
      
    </div>
  )
};

const mapStateToProps = state => state;

const Sales = connect(mapStateToProps)(_Sales);

export default Sales;