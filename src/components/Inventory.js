import React from 'react';
import {connect} from 'react-redux';
import CarCards from './CarCards';


const _Inventory = ({cars}) => {
  const inventory = cars.filter(car=>!car.sold)
  return (
    <div>
      <h3>Available Inventory</h3>
      <div className='gridContainer'>
        <div className='grid'>
          {inventory.map(car => <CarCards key={car.id} car={car}/>)}
        </div>
      </div>
      
    </div>
  )
};

const mapStateToProps = state => state;

const Inventory = connect(mapStateToProps)(_Inventory);

export default Inventory;