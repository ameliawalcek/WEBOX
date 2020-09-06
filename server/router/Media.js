const express = require("express");
const dataSources = require("../dataSources/DataSources");
const mediaRouter = express.Router();

mediaRouter.get("/trending", async (req, res) => {
  const { category, page, input } = req.query;

  if (input.length) {
    res.send({ creators: await dataSources.mongoClient.getSearchCreators(input, page)})
  } else {
    const creators = category === 'All'
      ? await dataSources.mongoClient.getCreatorsByPage(page)
      : await dataSources.mongoClient.getAllCreators()

    if (category === 'All') {
      res.send({ creators })
    } else {
      const streamNames = category
        ? await dataSources.twitchAPI.getTrendingByCategory(category, page)
        : await dataSources.twitchAPI.getTrending(page);
      res.send({ creators: creators.filter((c) => streamNames.find(n => n === c.twitch)) })
    }
  }
});

mediaRouter.get("/channel/:id", async (req, res) => {
  const { id } = req.params;
  let response = await dataSources.getCreatorLinksByid(id)
});

module.exports = mediaRouter