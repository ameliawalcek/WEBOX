const express = require('express')
const bodyParser = require('body-parser')
require('dotenv').config()
const authRoutes = require('./server/router/Auth.js')
const mediaRouter = require('./server/router/Media')
const userRouter = require('./server/router/User')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,UPDATE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
  next();
});

app.use('/auth', authRoutes)
app.use('/media', mediaRouter)
app.use('/user', userRouter)

const { PORT } = process.env
app.listen(PORT, () => {
  console.log(`Server is up on port ${PORT}`)
})