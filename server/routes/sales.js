const router = require('express').Router();
const Car = require('../../db/Car');
const Sale = require('../../db/Sale');
const Employee = require('../../db/Employee');

router.get('/', async(req, res, next) => {
  try{
    res.send(await Car.findAll({
      where: {
        sold: true
      },
      attributes: ['year', 'color', 'make', 'modelName', 'type', 'listPrice', 'imageUrl'],
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

module.exports = router;