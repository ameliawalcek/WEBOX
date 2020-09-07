const express = require("express");
const userRouter = express.Router();
const dataSources = require("../dataSources/DataSources");
const NotificationHandler = require("../notifications/notificationHandler");

userRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  const user = await dataSources.mongoClient.getUserById(id);
  res.send(user);
});

const createZap = async (creatorId) => {
  const isInFavourites = await dataSources.mongoClient.CreatorInFavourites(
    creatorId
  );
  console.log("isInFavourites", isInFavourites);
  if (isInFavourites) {
    return "already subscribed for this creator - all good";
  } else {
    const handler = new NotificationHandler();
    const creator = await dataSources.mongoClient.getCreatorById(creatorId);
    const response = await handler.subscribeYoutube(creator.youtube);
    //   const response = await handler.subscribeYoutube(creator.twitch);
    //   const response = await handler.subscribeYoutube(creator.tweeter);
    return response;
  }
};

userRouter.post("/favorites", async (req, res) => {
  const { creatorId, userId } = req.body;
  await createZap(creatorId);
  const response = await dataSources.mongoClient.addFavoriteToUser(
    creatorId,
    userId
  );
  res.send(response);
});
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
  console.log(mediaId, mediaType);
  const creator = await dataSources.mongoClient.getCreatorByMedia(
    mediaType,
    mediaId
  );
  console.log(creator);
  let notification = ''
  if (mediaType === "youtube") {
    notification = {
      creatorId: creator._id,
      creatorName: creator.twitch,
      mediaSource: "youtube",
      post: "new video was posted",
    };
  }
  const newNotification = await dataSources.mongoClient.saveNotification(notification);
  const updateSubscribedUsers = await dataSources.mongoClient.updateSubscribedUsers(
    creator._id, newNotification._id
  );

  console.log(newNotification, updateSubscribedUsers);  

  res.end();
});

userRouter.delete("/notifications", async (req, res) => {
  const { userId, notificationId } = req.body;
  const response = await dataSources.mongoClient.removeNotificationFromUser(
    notificationId,
    userId
  );
  res.send(response);
});

module.exports = userRouter;
