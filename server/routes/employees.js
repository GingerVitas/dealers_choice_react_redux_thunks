const router = require('express').Router;
const Employee = require('../../db/Employee');

router.get('/', async(req, res, next) => {
  try{
    res.send(Employee.findAll({
      include: Sale
    }))
  }
  catch(ex){
    next(ex)
  }
});

module.exports = router;