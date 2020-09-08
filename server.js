const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
require('dotenv').config()
const authRoutes = require('./server/router/Auth.js')
const mediaRouter = require('./server/router/Media')
const userRouter = require('./server/router/User')

const app = express()

app.use((req, res, next) => {
  if (!req.secure && req.headers["x-forwarded-proto"] !== "https") {
    return res.redirect('https://' + req.get('host') + req.url)
  }
  next()
})

app.use(express.static(path.join(__dirname, 'build')));

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))


app.use('/auth', authRoutes)
app.use('/media', mediaRouter)
app.use('/user', userRouter)

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const { PORT } = process.env
app.listen(PORT, () => {
  console.log(`Server is up on port ${PORT}`)
})
