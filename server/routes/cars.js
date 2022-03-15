const router = require('express').Router();
const Car = require('../../db/Car');

router.get('/', async(req, res, next) => {
  try{
    res.send(await Car.findAll({
      attributes: ['year', 'color', 'make', 'modelName', 'type', 'listPrice', 'imageUrl', 'sold']
    }))
  }
  catch(ex){
    next(ex)
  }
});

module.exports = router;