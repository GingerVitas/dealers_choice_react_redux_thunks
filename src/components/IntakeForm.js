import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {createCar} from '../store/carStore';

class _IntakeForm extends React.Component {
  constructor() {
    super(),
    this.state = {
      make: '',
      modelName: '',
      carType: '',
      color: '',
      year: 2000,
      mileage: 20000,
      listPrice: 15000,
      imageUrl: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  handleChange(ev) {
      this.setState({
      [ev.target.name]: ev.target.value
    })
  };

  handleSubmit(ev) {
    const car = this.state
    ev.preventDefault();
    this.props.sellCar(car)
  }

  render() {
    const {make, modelName, carType, color, year, mileage, listPrice, imageUrl} = this.state;
    const { handleChange, handleSubmit } = this;

    return (
      <div>
        <h3>Looking for a change? Let us do the work for you. Get a great price for your car now, and let us do the work of selling it?</h3>
        <div className='formContainer'>
          <form id='sellCarForm' onSubmit={handleSubmit}>
            <label htmlFor='make'>Make</label>
            <input name='make' value={make} onChange={handleChange} placeholder='Chevrolet, Ford, etc'/>

            <label htmlFor='modelName'>Model</label>
            <input name='modelName' value={modelName} onChange={handleChange} placeholder='Impala, Explorer, etc'/>

            <label htmlFor='carType'>Type</label>
            <input name='carType' value={carType} onChange={handleChange} placeholder='Sedan, SUV, etc'/>

            <label htmlFor='color'>Color</label>
            <input name='color' value={color} onChange={handleChange} placeholder='Metallic Blue'/>

            <label htmlFor='year'>Year</label>
            <input name='year' value={year} onChange={handleChange} placeholder='2000'/>

            <label htmlFor='mileage'>Mileage</label>
            <input name='mileage' value={mileage} onChange={handleChange} placeholder='20000'/>

            <label htmlFor='listPrice'>List Price</label>
            <input name='listPrice' value={listPrice} onChange={handleChange} placeholder='15000'/>

            <label htmlFor='imageUrl'>Link an Image</label>
            <input name='imageUrl' value={imageUrl} onChange={handleChange} placeholder='your image url here'/>

            <button type='submit'>Sell your car!</button>
            <Link to='/'>Cancel</Link>
          </form>
        </div>
      </div>
      

    )
  }

}

const mapDispatchToProps = (dispatch, {history}) => {
  return {
    sellCar: (car) => dispatch(createCar(car, history))
  }
}

const IntakeForm = connect(null, mapDispatchToProps)(_IntakeForm);

export default IntakeForm;