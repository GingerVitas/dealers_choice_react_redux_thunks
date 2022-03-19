import React from 'react';
import {connect} from 'react-redux';
import {buyCar} from '../store/carStore'

const _InventoryCards = ({cars, buyCar}) => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  })

  return (
    cars.filter(car=> !car.sold).map(car => (
      <div className='card' key={car.id}>
        <img className='carImage' src={car.imageUrl} />
        <div className='year'>Year: <br />{car.year}</div>
        <div className='make'>Make: <br />{car.make}</div>
        <div className='model'>Model: <br />{car.modelName}</div>
        <div className='carColor'>Color: <br />{car.color}</div>
        <div className='type'>Type: <br />{car.type}</div>
        <div className='mileage'>Mileage: <br />{car.mileage}</div>
        <div className='price'>Price: <br />{formatter.format(car.listPrice)}</div>
        <div className='button'><button onClick={()=> buyCar(car)}>Buy it Now!!</button></div>
      </div>
    ))
   
  )
}


const mapDispatchToProps = (dispatch, {history}) => {
  return {
    buyCar: (car) => dispatch(buyCar(car, history))
  }
}

const InventoryCards = connect(state => state, mapDispatchToProps)(_InventoryCards)

export default InventoryCards;