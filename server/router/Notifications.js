const express = require('express')
const { mongoClient, youtubeAPI } = require('../dataSources/DataSources')
const notificationRouter = express.Router()
const appSocket = require('../Socket')

notificationRouter.get('/twitch/callback', (req, res) => {
  res.type('text/plain').status(200).send('hub.challenge ' + req.query['hub.challenge'])
})

notificationRouter.post('/twitch/callback', async (req, res) => {
  res.sendStatus(200)
  const { data } = req.body

  if (data.length) {
    const notification = data[0]
    const creatorDoc = await mongoClient.getCreatorByMedia('twitch', notification.user_name)

    const notificationDoc = await mongoClient.saveNotification({
      creatorId: creatorDoc,
      creatorName: notification.user_name,
      mediaSource: 'twitch',
      post: `just went live!`
    })

    await mongoClient.updateSubscribedUsers(creatorDoc._id, notificationDoc._id)
    appSocket.emitToAllSubscribedUsers(await mongoClient.getSubscribedUsersIds(creatorDoc._id), notificationDoc)
  }
})

notificationRouter.get('/youtube/callback', (req, res) => {
  res.status(200).send(req.query['hub.challenge'])
})

notificationRouter.post('/youtube/callback', async (req, res) => {
  res.sendStatus(200)
  const { headers } = req

  const youtubeId = youtubeAPI.parseYoutubeNotification(headers)
  const creatorDoc = await mongoClient.getCreatorByMedia('youtube', youtubeId)
  const notificationDoc = await mongoClient.saveNotification({
    creatorId: creatorDoc,
    creatorName: creatorDoc.twitch,
    mediaSource: "youtube",
    post: `uploaded a video!`,
  })

  await mongoClient.updateSubscribedUsers(creatorDoc._id, notificationDoc._id)
  appSocket.emitToAllSubscribedUsers(await mongoClient.getSubscribedUsersIds(creatorDoc._id), notificationDoc)
});

module.exports = notificationRouter