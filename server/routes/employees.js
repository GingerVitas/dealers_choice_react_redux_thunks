const router = require('express').Router();
const Employee = require('../../db/Employee');
const Sale = require('../../db/Sale');
const Car = require('../../db/Car');

router.get('/', async(req, res, next) => {
  try{
    res.send(await Employee.findAll({
      include: [
        {
          model: Sale,
          attributes: ['salePrice'],
          include: [
            {
            model:Car,
            attributes: ['year','color', 'make', 'modelName', 'type', 'listPrice']
            }
          ]
        }
      ],
      order: ['id']
    }))
  }
  catch(ex){
    next(ex)
  }
});

module.exports = router;