import React from 'react';
import {connect} from 'react-redux';


const _Inventory = ({cars}) => {
  return (
    <div>
      <h3>Cars go here</h3>
    </div>
  )
};

const mapStateToProps = state => state;

const Inventory = connect(mapStateToProps)(_Inventory);

export default Inventory;