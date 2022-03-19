import React, { Component } from 'react';
import {render} from 'react-dom';
import {connect, Provider} from 'react-redux';
import {HashRouter,Route, Link} from 'react-router-dom';
import Nav from './components/Nav';
import Sales from './components/Sales';
import Inventory from './components/Inventory';
import Employees from './components/Employees';
import SingleEmployee from './components/SingleEmployee';
import IntakeForm from './components/IntakeForm';
import '../public/main.css';
import store from './store/index';
import { loadCars } from './store/carStore';
import { loadEmployees } from './store/employeeStore';


class _Root extends Component {
  componentDidMount() {
    const {loadCars, loadEmployees} = this.props;
    loadCars();
    loadEmployees();
  }
  render() {
    return (
      <HashRouter>
        <div>
          <h1 className='header'><Link to='/'>ACME Used Car Sales</Link></h1>
          <Nav />
          <div className='renderContainer'>
            <h2> Welcome to ACME Used Car Sales!!</h2>
            <Route path='/' />
            <Route exact path='/inventory' component={Inventory} />
            <Route exact path='/employees' component={Employees} />
            <Route exact path='/sales' component={Sales} />
            <Route exact path='/employees/:id' component={SingleEmployee} />
            <Route exact path='/intake' component={IntakeForm} />
          </div>
        </div>
      </HashRouter>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadCars: () => {
      dispatch(loadCars())
    },
    loadEmployees: () => {
      dispatch(loadEmployees())
    },
  };
};

const Root = connect(null, mapDispatchToProps)(_Root)

render(<Provider store={store}><Root /></Provider>, document.querySelector('#root'));