const express = require('express');
const app = express();
const path = require('path');

app.use('/dist', express.static(path.join(__dirname, 'dist')));


app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));

app.get('/api/inventory', require('./routes/inventory'));
app.get('/api/sales', require('./routes/sales'));
app.get('/api/employees', require('./routes/employees'));

const port = process.env.PORT || 3000;

applisten(port, ()=> console.log(`listening on port ${port}`));