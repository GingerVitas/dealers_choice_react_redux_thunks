const router = require('express').Router();
const Employee = require('../../db/Employee');
const Sale = require('../../db/Sale');
const Car = require('../../db/Car');

router.get('/', async(req, res, next) => {
  try{
    res.json(await Employee.findAll({
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

router.get('/:id', async(req, res, next) => {
  try{
    const employee = (await Employee.findByPk(req.params.id, {
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
    }));
    res.json(employee)
  }
  catch(ex){
    next(ex)
  }
});

module.exports = router;