const db = require('./db');
const Sequelize = require('sequelize');

const Employee = db.define('employee', {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  email: {
    type: Sequelize.STRING,
    validate: {
      isEmail: true
    }
  },
  imageUrl: {
    type: Sequelize.STRING
  },
  phone: {
    type: Sequelize.STRING
  }
});

module.exports = Employee;