const { randomInteger, priceGen, employees, soldCars, availableCars, sales } = require('./seedData');
const { Car, Employee, Sale, db } = require('./index');

const syncAndSeed = async()=> {
  try{
    await db.sync({force:true});

    await Employee.bulkCreate(employees)
    .then(()=> console.log('Employees seeded'));
    await Car.bulkCreate(soldCars)
    .then(()=> console.log('Sold Cars Seeded'));
    await Sale.bulkCreate(sales)
    .then(()=> console.log('Sales logged'));
    await Car.bulkCreate(availableCars)
    .then(()=> console.log('Inventory stocked!'));
  }
  catch(ex){
    console.log(ex)
  }
};

module.exports = syncAndSeed



