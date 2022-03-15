import React, { Component } from 'react';
import {render} from 'react-dom';
import {connect, Provider} from 'react-redux';
import Nav from './components/Nav';
import store from './store';
import { loadCars, loadEmployees, setView} from './store';
import Sales from './components/Sales';
import Inventory from './components/Inventory';
import Employees from './components/Employees';
import '../public/main.css';

class _Root extends Component {
  componentDidMount() {
    const {loadCars, loadEmployees, setView} = this.props;
    loadCars();
    loadEmployees();
    window.addEventListener('hashchange', () => {
      setView(window.location.hash.slice(1))
    });
    setView(window.location.hash.slice(1));
  }

  render() {
    const {view} = this.props;
    return (
    <div>
      <h1>ACME Used Car Sales</h1>
      <Nav />
      <div className='renderContainer'>
        {
        view === 'inventory' ? <Inventory />
        : view === 'employees' ? <Employees />
        : view === 'sales' ? <Sales />
        : <h2> Welcome to ACME Used Car Sales!!</h2>
        }
      </div>
    </div>
    )
  }
}

const mapStateToProps = state => state;
const mapDispatchToProps = (dispatch) => {
  return {
    setView: (view) => dispatch(setView(view)),
    loadCars: () => {
      dispatch(loadCars())
    },
    loadEmployees: () => {
      dispatch(loadEmployees())
    },
  };
};

const Root = connect(mapStateToProps, mapDispatchToProps)(_Root)

render(<Provider store={store}><Root /></Provider>, document.querySelector('#root'));