import React from 'react';
import {connect} from 'react-redux';

class _IntakeForm extends React.Component {
  constructor() {
    super(),
    this.state = {
      make: '',
      modelname: '',
      type: '',
      color: '',
      year: 2000,
      mileage: 20000,
      listPrice: 15000
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  handleChange(ev) {
    this.setState({
      ...this.state,
      [ev.name.value]: ev.target.value
    })
  };

  handleSubmit(ev) {
    ev.preventDefault();
    this.props.createCar({...this.state})
  }

  render() {
    const {make, modelname, type, color, year, mileage, listPrice} = this.state;
    const { handleChange, handleSubmit } = this;

    return (
      <h1>Hi</h1>
    )
  }

}

const mapDispatchToProps = (dispatch, {history}) => {
  return {
    createCar: () => dispatch(createCar(car, history))
  }
}

const IntakeForm = connect(null, mapDispatchToProps)(_IntakeForm);

export default IntakeForm;