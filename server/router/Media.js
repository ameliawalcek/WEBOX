const express = require("express");
const dataSources = require("../dataSources/DataSources");
const mediaRouter = express.Router();

mediaRouter.get("/trending", async (req, res) => {
  let { category } = req.query;
  const streamNames = category
    ? dataSources.twitchAPI.getTrendingByCategory(category)
    : dataSources.twitchAPI.getTrending();

  const creators = await dataSources.mongoClient.getAllCreators();

  const creatorDocuments = streamNames.map((name) => {
    creators.filter((c) => c.twitch === name);

    res.send(creatorDocuments)
  });
});

mediaRouter.get("/channel/:id", async (req, res) => {
  let { id } = req.params;
  const creator = await dataSources.mongoClient.getCreatorById(id)
  res.send(creator);
});



module.exports = mediaRouter;
