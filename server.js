const express = require('express')
const bodyParser = require('body-parser')
require('dotenv').config()

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

const { PORT } = process.env
app.listen(PORT, () => {
  console.log(`Server is up on port ${PORT}`)
})