const router = require('express').Router();
const Car = require('../../db/Car');
const Sale = require('../../db/Sale');
const Employee = require('../../db/Employee');

router.get('/', async(req, res, next) => {
  try{
    res.send(await Car.findAll({
      attributes: ['year', 'color', 'make', 'modelName', 'type', 'mileage', 'listPrice', 'imageUrl', 'sold'],
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

// router.put('/', async(req, res, next) => {
//   try{
//     await Car.update({

//     })
//   }
//   catch(ex){
//     next(ex)
//   }
// })

module.exports = router;