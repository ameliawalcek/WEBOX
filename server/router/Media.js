const express = require('express')
const mediaRouter = express.Router()


mediaRouter.get("/trending", async (req, res) => {
    let { category } = req.query
    res.send(category)
});

mediaRouter.get("/channel/:ref", async (req, res) => {
    let { ref } = req.params    
    res.send(ref)
 });    

module.exports = mediaRouter