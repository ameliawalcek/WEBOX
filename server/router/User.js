const express = require("express");
const userRouter = express.Router();
const dataSources = require('../dataSources/DataSources')
const NotificationHandler = require('../notifications/notificationHandler')

userRouter.get("/:id", async (req, res) => {
    const { id } = req.params
    const user = await dataSources.mongoClient.getUserById(id)
    res.send(user)
});

userRouter.post("/favorites", async (req, res) => {
    const { creatorId, userId } = req.body
    const response = await dataSources.mongoClient.addFavoriteToUser(creatorId, userId)
    res.send(response)
});

userRouter.delete("/favorites", async (req, res) => {
    const { creatorId, userId } = req.body
    const response = await dataSources.mongoClient.removeFavoriteFromUser(creatorId, userId)
    res.send(response)
});

userRouter.post("/notifications", async (req, res) => {
    const { creatorId, userId } = req.body
    const creator = await dataSources.mongoClient.getCreatorById(creatorId)
    const handler = new NotificationHandler()
    console.log(creator.youtube)
    const response = await handler.subscribeYoutube(creator.youtube) 
    // add save in db
    res.send(response)
    // res.send(creator.youtube)
});

userRouter.delete("/notifications", async (req, res) => {
    const { userId, notificationId } = req.body
    const response = await dataSources.mongoClient.removeNotificationFromUser(notificationId, userId)
    res.send(response)
});

module.exports = userRouter;