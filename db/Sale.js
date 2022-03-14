const db = require('./index');
const Sequelize = require('sequelize');

const Sale = db.define('sale', {
  salePrice: {
    type: Sequelize.INTEGER,
  }
});

module.exports = Sale;