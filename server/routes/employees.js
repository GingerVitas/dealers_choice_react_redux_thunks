const router = require('express').Router();
const Employee = require('../../db/Employee');
const Sale = require('../../db/Sale');
const Car = require('../../db/Car');
const faker = require('@faker-js/faker');

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
            attributes: ['year','color', 'make', 'modelName', 'carType', 'listPrice']
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
            attributes: ['year','color', 'make', 'modelName', 'carType', 'listPrice']
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

router.post('/', async(req, res, next) => {
  try{
    const newEmployee = await Employee.createRandom()
    res.status(201).send(newEmployee);
  }
  catch(ex){
    next(ex)
  }
})

router.delete('/:id', async(req, res, next) => {
  try{
    const employee = await Employee.findByPk(req.params.id);
    await employee.destroy();
    res.sendStatus(204)

  }
  catch(ex){
    next(ex)
  }
})

module.exports = router;