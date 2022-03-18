import React from 'react';
import {connect} from 'react-redux';
import {buyCar} from '../store'

const _SoldCards = ({cars, buyCar}) => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  })

  return (
    cars.filter(car=> car.sold).map(car => (
      <div className='card' key={car.id}>
        <img className='carImage' src={car.imageUrl} />
        <div className='year'>Year: <br />{car.year}</div>
        <div className='make'>Make: <br />{car.make}</div>
        <div className='model'>Model: <br />{car.modelName}</div>
        <div className='carColor'>Color: <br />{car.color}</div>
        <div className='type'>Type: <br />{car.type}</div>
        <div className='mileage'>Mileage: <br />{car.mileage}</div>
        <div className='price'>Sold For: <br />{formatter.format(car.sale.salePrice)}</div>
        <div className='button'>Sold by {car.sale.employee.firstName} {car.sale.employee.lastName}</div>
      </div>
    ))
   
  )
}


const mapDispatchToProps = (dispatch, {history}) => {
  return {
    buyCar: (car) => dispatch(buyCar(car, history))
  }
}

const SoldCards = connect(state => state, mapDispatchToProps)(_SoldCards)

export default SoldCards;