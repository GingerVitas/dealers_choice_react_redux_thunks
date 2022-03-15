import React from 'react';

const Cards = ({car}) => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  })
  return (
    <div className='card'>
        <img className='carImage' src={car.imageUrl} />
        <div className='year'>Year: {car.year}</div>
        <div className='make'>Make: {car.make}</div>
        <div className='model'>Model: {car.modelName}</div>
        <div className='color'>Color: {car.color}</div>
        <div className='type'>Type: {car.type}</div>
        <div className='mileage'>Mileage: {car.mileage}</div>
        {!car.sold ? <div className='price'>Price: {formatter.format(car.listPrice)}</div> : <div className='price'>Sold For: {formatter.format(car.sale.salePrice)}</div>}
        {!car.sold ? <div><button>Buy it Now!!</button></div> : <div>Sold by {car.sale.employee.firstName} {car.sale.employee.lastName}</div>}
    </div>
  )
}

export default Cards;