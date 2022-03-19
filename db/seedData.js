const {faker} = require('@faker-js/faker');
const randomInteger = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
let id = 0;
const idAssigner = () => {
    id++;
    return id
  }

const priceGen = function() {
  return randomInteger((this.listPrice - 1500), (this.listPrice + 5000));
}


const employees = [...Array(5)].map(employee => (
  {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    imageUrl: faker.image.avatar(),
    phone: faker.phone.phoneNumber()
  }
));

const soldCars = [...Array(25)].map(car => (
  {
    make: faker.vehicle.manufacturer(),
    modelName: faker.vehicle.model(),
    carType: faker.vehicle.type(),
    color: faker.vehicle.color(),
    year: randomInteger(1967, 2023),
    mileage: randomInteger(45, 200000),
    listPrice: randomInteger(2000, 100000),
    sold: true
    }
));


const availableCars = [...Array(25)].map(car => (
  {
    make: faker.vehicle.manufacturer(),
    modelName: faker.vehicle.model(),
    carType: faker.vehicle.type(),
    color: faker.vehicle.color(),
    year: randomInteger(1967, 2023),
    mileage: randomInteger(45, 200000),
    listPrice: randomInteger(2000, 100000),
    sold: false
    }
));

const preSales = [...Array(25)].map(sale => (
  {
    employeeId: randomInteger(1, employees.length),
    carId: idAssigner(),
  }
));

const sales = preSales.map(sale => {
  return {...sale, salePrice: priceGen.call(soldCars[sale.carId-1])}
});

module.exports = {
  randomInteger,
  priceGen,
  employees,
  soldCars,
  availableCars,
  sales
}