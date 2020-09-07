const express = require('express')
const bodyParser = require('body-parser')
const webPush = require("web-push");
require('dotenv').config()
const authRoutes = require('./server/router/Auth.js')
const mediaRouter = require('./server/router/Media')
const userRouter = require('./server/router/User')
const subscribeRouter = require('./server/router/Subscribe')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Headers', '*');
  // res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,UPDATE,OPTIONS');
  
  next();
});

const publicVapidKey =
  "BDXWCHbGPKmL3JZIXkIe1_2n-TMVAMWQ5ukV55hy7V5nA1Aqj-p_4dpaKOcm0TAed5w0f-ZHDU9sQGBnWB0TGP4";
const privateVapidKey = "3OfrgkNxYnR2sQgHaEOVEBTRcvz0n8JWPS3zEB8OZvg";

webPush.setVapidDetails(
  "mailto:test@test.com",
  publicVapidKey,
  privateVapidKey
);

app.use('/auth', authRoutes)
app.use('/media', mediaRouter)
app.use('/user', userRouter)
app.use('/subscribe', subscribeRouter)

const { PORT } = process.env
app.listen(PORT, () => {
  console.log(`Server is up on port ${PORT}`)
})