const express = require ('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const helmet = require('helmet');

const cors = require('cors');
const mongoose =require('mongoose');

const userModel= require('./userModel')
const userRouter = require('./userRouter');

mongoose.connect('process.env.MONGO_URI')

.then(() =>
  console.log('\n===connected to mongo===\n'))

.catch(err =>console.log('not connected'));


const server = express();

server.use(morgan('dev'));
server.use(helmet());
server.use(express.json());
server.use('/api/users', userRouter);

server.get('/api/users',  (req, res) => {
  res.send({api: 'running...' });
 });




const port = process.env.PORT || 5000;
server.listen(port, () =>console.log('server listening at port 5000'));
