// import mongoose
const mongoose = require('mongoose');
// load env variables
const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');

const postRoutes = require('./routes/post');

//db connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true })
  .then(() => console.log('DB Connected'));

mongoose.connection.on('error', (err) => {
  console.log(`DB connection error: ${err.message}`);
});

// Middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(expressValidator());

app.use('/', postRoutes);

const port = 8080;
app.listen(port, () => {
  console.log(`Node is running on port: ${port}`);
});
