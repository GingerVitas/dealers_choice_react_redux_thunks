import React from 'react';
import {connect} from 'react-redux';
import {Route} from 'react-router-dom';
import SoldCards from './SoldCards';


const _Sales = ({cars}) => {
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