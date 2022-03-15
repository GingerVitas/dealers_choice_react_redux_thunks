import React from 'react';
import {connect} from 'react-redux';
import Cards from './Cards';


const _Inventory = ({cars}) => {
  const inventory = cars.filter(car=>!car.sold)
  return (
    <div>
      <h3>Available Inventory</h3>
      <div className='grid'>
        {inventory.map(car => <Cards key={car.id} car={car}/>)}
      </div>
      
    </div>
  )
};

const mapStateToProps = state => state;

const Inventory = connect(mapStateToProps)(_Inventory);

export default Inventory;