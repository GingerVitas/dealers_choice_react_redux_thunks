const db = require('./db')
const Employee = require('./Employee');
const Car = require('./Car');
const Sale = require('./Sale');

Sale.belongsTo(Employee);
Employee.hasMany(Sale);
Sale.belongsTo(Car);
Car.hasOne(Sale);

module.exports = {
  db,
  Employee,
  Car,
  Sale
}