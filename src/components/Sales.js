import React from 'react';
import {connect} from 'react-redux';


const _Sales = ({cars}) => {
  return (
    <div>
      <h3>Sales go here</h3>
    </div>
  )
};

const mapStateToProps = state => state;

const Sales = connect(mapStateToProps)(_Sales);

export default Sales;