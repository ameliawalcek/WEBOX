const express = require("express");
const userRouter = express.Router();
const dataSources = require('../dataSources/DataSources')

userRouter.get("/:id", async (req, res) => {
    const { id } = req.params
    const user = dataSources.mongoClient.getUserById(id)
    res.send(user)
});
userRouter.post("/favorites", async (req, res) => {
    console.log(req.body)
    const { creatorId, userId } = req.body 
    const response = await dataSources.mongoClient.addFavoriteToUser(creatorId, userId) 
    res.send(response)
}); 
userRouter.delete("/favorites", async (req, res) => {
    const { creatorId, userId } = req.body
    const response = await dataSources.mongoClient.deleteFavoriteFromUser(creatorId, userId) 
    res.send(response)
});

userRouter.delete("/notifications", async (req, res) => {
    const { userId, notificationId } = req.body
    const response = await dataSources.mongoClient.removeNotificationFromUser() 
    res.send(response)
});


module.exports = userRouter;


