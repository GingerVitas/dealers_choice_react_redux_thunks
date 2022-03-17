const db = require('./db');
const Sequelize = require('sequelize');
const {faker} = require('@faker-js/faker');
const Sale = require('./Sale');

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

Employee.createRandom = function() {
  return this.create(
    {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    imageUrl: faker.image.avatar(),
    phone: faker.phone.phoneNumber(),
    sales: []
  },
  {
    include: [Sale]
  }
  )
}

module.exports = Employee;