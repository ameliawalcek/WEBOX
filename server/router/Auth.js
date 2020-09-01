const express = require("express");
const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
    res.send('success')
});

authRouter.post("/signin", async (req, res) => {
    res.send('success')
});

module.exports = authRouter;
