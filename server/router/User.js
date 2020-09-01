const express = require("express");
const userRouter = express.Router();

userRouter.get("/:id", async (req, res) => {
    console.log(req)
    const { id } = req.params
    res.send(id)
});
userRouter.post("/favorites", async (req, res) => {
    console.log(req.body)
    const { creatorId, userId } = req.body  
    res.send(req.body)
}); 
userRouter.delete("/favorites", async (req, res) => {
    const { creatorId, userId } = req.body
    res.send(req.body)
});

userRouter.delete("/notifications/:id", async (req, res) => {
    const { id } = req.params
    res.send(id)
});


module.exports = userRouter;


