const router = require('express').Router();
const {Car, Sale, Employee} = require('../../db/index');

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

router.get('/:id', async(req, res, next) => {
  try{
    res.send(await Car.findByPk(req.params.id, {
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
    const car = await Car.findByPk(req.params.id, {
      attributes: ['id', 'year', 'color', 'make', 'modelName', 'type', 'mileage', 'listPrice', 'imageUrl', 'sold'],
      include: [
          {
            model: Sale,
            attributes: ['salePrice', 'employeeId'],
            include: [Employee]
          }
        ]
    })
    res.send(await car.update(req.body, {
      returning: true
    }))
  }
  catch(ex){
    next(ex)
  }
})

module.exports = router;