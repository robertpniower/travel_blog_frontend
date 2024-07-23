const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes');


const PORT = process.env.PORT || 8000;


app.use('/api', userRoutes);

app.get('/', function (req, res) {
  res.send('Hello from Server')
})

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
    
});
