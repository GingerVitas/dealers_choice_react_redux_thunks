import React from 'react';
import {connect} from 'react-redux';

const _CarCards = ({car}) => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  })
  return (
    <div className='card' id={car.id}>
        <img className='carImage' src={car.imageUrl} />
        <div className='year'>Year: <br />{car.year}</div>
        <div className='make'>Make: <br />{car.make}</div>
        <div className='model'>Model: <br />{car.modelName}</div>
        <div className='carColor'>Color: <br />{car.color}</div>
        <div className='type'>Type: <br />{car.type}</div>
        <div className='mileage'>Mileage: <br />{car.mileage}</div>
        {!car.sold ? <div className='price'>Price: <br />{formatter.format(car.listPrice)}</div> : <div className='price'>Sold For: <br />{formatter.format(car.sale.salePrice)}</div>}
        {!car.sold ? <div className='button'><button onClick={()=> buyCar(car)}>Buy it Now!!</button></div> : <div className='button'>Sold by {car.sale.employee.firstName} {car.sale.employee.lastName}</div>}
    </div>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    buyCar: (car) => dispatch(buyCar(car))
  }
}

const CarCards = connect(null, mapDispatchToProps)(_CarCards)

export default CarCards;