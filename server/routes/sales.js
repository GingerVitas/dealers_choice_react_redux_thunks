const router = require('express').Router();
const { Car, Sale, Employee} = require('../../db/index');
const db = require('../../db/db');

const randomInteger = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const priceGen = function() {
  return randomInteger((this.listPrice - 1500), (this.listPrice + 5000));
}

router.get('/', async(req, res, next) => {
  try{
    res.send(await Car.findAll({
      where: {
        sold: true
      },
      attributes: ['year', 'color', 'make', 'modelName', 'carType', 'listPrice', 'imageUrl'],
      include: [
        {
          model: Sale,
          attributes: ['salePrice'],
          include: [
            {
              model: Employee,
              attributes: ['firstName', 'lastName']
            }
          ]
        }
      ]
    }))
  }
  catch(ex){
    next(ex)
  }
});

router.post('/', async(req, res, next) => {
  try{
    const car = req.body.newCar;
    const employees = await Employee.findAll();
    const sale = await Sale.create( {
      carId: car.id,
      employeeId: randomInteger(1, employees.length),
      salePrice: priceGen.call(car)
    });
    res.status(201).send(sale);
  }
  catch(ex){
    next(ex)
  }
})

module.exports = router;