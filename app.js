const path = require('path');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const sequelize = require('./utils/database');
const cors = require('cors');
const userRoutes = require('./routes/index');

// Enable CORS for all routes
app.use(cors());

// Middleware for parsing URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
app.use(express.static('public'));

app.set('view engine', 'ejs');
app.set('views', 'views');

// Middleware for parsing JSON in the request body
app.use(express.json());

// Use the userRoutes middleware
app.use(userRoutes);

sequelize
  .sync()
  .then(result => {
    app.listen(3000, () => {
      console.log('Server is running on port 3000');
    });
  })
  .catch(err => {
    console.log(err);
  });
