const express = require("express");
const app = express();
const socket = require('socket.io')
const bodyParser = require("body-parser");
require("dotenv").config();
const authRoutes = require("./server/router/Auth.js");
const mediaRouter = require("./server/router/Media");
const userRouter = require("./server/router/User");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Headers", "*");
  // res.header('Access-Control-Allow-Credentials', true);
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,UPDATE,OPTIONS");
  next();
});

app.use("/auth", authRoutes);
app.use("/media", mediaRouter);
app.use("/user", userRouter);

const { PORT } = process.env
const server = app.listen(PORT, () => {
  console.log(`Server is up on port ${PORT}`);
});

const io = socket(server)

io.on('connection', (socket) => {
  console.log('connect')
})

app.post('/notification', (req, res) => {
  io.emit('test', { test: 'test' })
})