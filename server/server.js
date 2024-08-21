const express = require('express');
const app = express();
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
require('dotenv').config();

const PORT = process.env.PORT || 8000;

app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use('/', userRoutes);


app.get('/', (req, res) => {
  res.send('Hello from Server');
});

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
