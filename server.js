const express = require('express');
 const connectDB = require('./config/db');
 const dotenv = require('dotenv');
 dotenv.config();

const app = express();

 connectDB();

app.get('/', function (req, res) {
    res.send('Hello World')
  })

 app.use(express.json({ extended: false }));

 app.use('/api/auth', require('./routes/authRoutes'));
 app.use('/api/products', require('./routes/productRoutes'));

const PORT = process.env.PORT || 8000;

app.listen(8000, () => console.log(`Server running on port`));

