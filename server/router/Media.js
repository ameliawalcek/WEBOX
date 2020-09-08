const express = require("express")
const dataSources = require("../dataSources/DataSources")
const { checkPageInCache, checkCreatorInCache } = require('../middleWare/middleWares')
const client = require('../../server')
const mediaRouter = express.Router()

mediaRouter.get("/trending", checkPageInCache, async (req, res) => {
  const { category, page, input } = req.query

  if (input.length) {
    res.send({ creators: await dataSources.mongoClient.getSearchCreators(input, page) })
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
})

mediaRouter.get("/channel/:id", checkCreatorInCache, async (req, res) => {
  const { id } = req.params;
  const result = await dataSources.getCreatorLinksByid(id)

  client.setex(id, 3600, JSON.stringify(result))

  res.send(result)
});

module.exports = mediaRouter