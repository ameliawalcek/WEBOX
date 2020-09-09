const express = require("express");
const userRouter = express.Router();
const dataSources = require("../dataSources/DataSources");
const NotificationHandler = require("../notifications/notificationHandler");

userRouter.get("/:id", async (req, res) => {
  const { id } = req.params
  const user = await dataSources.mongoClient.getUserById(id);
  res.send(user)
});

userRouter.post("/favorites", async (req, res) => {
  const { creatorId, userId } = req.body;
  const response = await dataSources.mongoClient.addFavoriteToUser(
    creatorId,
    userId
  );
  res.send(response);
})

userRouter.delete("/favorites", async (req, res) => {
  const { creatorId, userId } = req.body;
  const response = await dataSources.mongoClient.removeFavoriteFromUser(
    creatorId,
    userId
  );
  res.send(response);
});

userRouter.post("/notifications", async (req, res) => {
  const { mediaId } = req.body;
  const mediaType = mediaId.includes("UC") ? "youtube" : false;
  const creator = await dataSources.mongoClient.getCreatorByMedia(
    mediaType,
    mediaId
  );
  let notification;
  if (mediaType === "youtube") {
    notification = {
      creatorId: creator._id,
      creatorName: creator.twitch,
      mediaSource: "youtube",
      post: "new video was posted",
    };
  }
  const newNotification = await dataSources.mongoClient.saveNotification(
    notification
  );
  const users = await dataSources.mongoClient.updateSubscribedUsers(
    creator._id,
    newNotification._id
  );
  res.send(users);
});

userRouter.delete("/notifications", async (req, res) => {
  console.log(req)
  const { userId, notificationId } = req.body;
  const response = await dataSources.mongoClient.removeNotificationFromUser(
    notificationId,
    userId
  );
  res.send(response);
});

module.exports = userRouter;
