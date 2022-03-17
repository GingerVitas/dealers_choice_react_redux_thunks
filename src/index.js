import React, { Component } from 'react';
import {render} from 'react-dom';
import {connect, Provider} from 'react-redux';
import Nav from './components/Nav';
import store from './store';
import { loadCars, loadEmployees } from './store';
import Sales from './components/Sales';
import Inventory from './components/Inventory';
import Employees from './components/Employees';
import '../public/main.css';
import {HashRouter,Route, Link} from 'react-router-dom';
import SingleEmployee from './components/SingleEmployee';

class _Root extends Component {
  componentDidMount() {
    const {loadCars, loadEmployees, setView} = this.props;
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