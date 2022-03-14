const router = require('express').Router();
const Car = require('../../db/Car');

router.get('/', async(req, res, next) => {
  try{
    res.send(await Car.findAll({
      where: {
        sold: false
      }
    }))
  }
  catch(ex){
    next(ex)
  }
});

module.exports = router;