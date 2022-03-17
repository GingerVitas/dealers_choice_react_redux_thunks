const router = require('express').Router();
const Car = require('../../db/Car');
const Sale = require('../../db/Sale');
const Employee = require('../../db/Employee');

router.get('/', async(req, res, next) => {
  try{
    res.send(await Car.findAll({
      attributes: ['id', 'year', 'color', 'make', 'modelName', 'type', 'mileage', 'listPrice', 'imageUrl', 'sold'],
      include: [
          {
            model: Sale,
            attributes: ['salePrice', 'employeeId'],
            include: [Employee]
          }
        ]
    }))
  }
  catch(ex){
    next(ex)
  }
});

router.put('/:id', async(req, res, next) => {
  try{
    console.log(req.params.id)
    const car = await Car.findByPk(req.params.id)
    res.send(await car.update(req.body))
  }
  catch(ex){
    next(ex)
  }
})

module.exports = router;