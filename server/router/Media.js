const express = require("express");
const dataSources = require("../dataSources/DataSources");
const redis = require('redis')
const mediaRouter = express.Router();

const client = redis.createClient({
  host: 'redis-server',
  port: 6379
})

const checkCreatorInCache = (req, res, next) => {
  const { id } = req.params;

  client.get(id, (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    }
    //if no match found
    if (data != null) {
      res.send(data);
    } else {
      //proceed to next middleware function
      next();
    }
  });
};

const checkPageInCache = (req, res, next) => {
  const { category, page } = req.query;
  if (category) {
    next()
  } else {
    client.get(page, (err, data) => {
      if (err) {
        console.log(err);
        res.status(500).send(err);
      }
      //if no match found
      if (data != null) {
        res.send(data);
      } else {
        //proceed to next middleware function
        next();
      }
    });
  }
};

mediaRouter.get("/trending", checkPageInCache, async (req, res) => {
  const { category, page } = req.query;

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
});

mediaRouter.get("/channel/:id", checkCreatorInCache, async (req, res) => {
  const { id } = req.params;
  const result = await dataSources.getCreatorLinksByid(id)

  client.setex(id, 3600, JSON.stringify(result))

  res.send(result)
});

module.exports = mediaRouter