const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

const authRoutes = require('./routes/authRoutes');
const carRoutes = require('./routes/carRoutes');
const orderRoutes = require('./routes/orderRoutes');
const userRoutes = require('./routes/userRoutes');
const salesRoutes = require('./routes/salesRoutes');

const port = process.env.PORT || 5000;

app.use(
  cors(
    {
      origin: 'http://localhost:3000',
      methods: 'GET,POST,PUT,DELETE',
      credentials: true
    }
  )
);

app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/cars', carRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/users', userRoutes);
app.use('/api/sales', salesRoutes)

app.listen(port, () => {
  console.log(`API is on ${port}`);
});
