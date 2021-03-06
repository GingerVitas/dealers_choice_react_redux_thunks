const express = require('express');
const app = express();
const path = require('path');
const syncAndSeed = require('../db/syncAndSeed')

app.use(express.json())
app.use('/dist', express.static(path.join(__dirname, '../dist')));
app.use('/public', express.static(path.join(__dirname, '../public')))

app.get('/', (req, res) => res.sendFile(path.join(__dirname, '..', 'index.html')));

app.use('/api/cars', require('./routes/cars'));
app.use('/api/sales', require('./routes/sales'));
app.use('/api/employees', require('./routes/employees'));




const init = async() => {
  try{
    await syncAndSeed();
    const port = process.env.PORT || 3000;
    app.listen(port, ()=> console.log(`listening on port ${port}`));
  }
  catch(ex){
    console.log(ex)
  }
}

init();