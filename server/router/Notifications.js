const express = require('express')
const { mongoClient } = require('../dataSources/DataSources')
const notificationRouter = express.Router()
const appSocket = require('../Socket')

notificationRouter.get('/twitch/callback', (req, res) => {
  res.type('text/plain').send('hub.challenge ' + req.query['hub.challenge'])
})

notificationRouter.post('/twitch/callback', async (req, res) => {
  res.sendStatus(200)
  const { data } = req.body

  if (data.length) {
    const notification = data[0]
    const creatorDoc = await mongoClient.getCreatorByTwitchName('twitch', notification.user_name)

    const notificationDoc = await mongoClient.saveNotification({
      creatorId: creatorDoc,
      creatorName: notification.user_name,
      mediaSource: 'twitch',
      post: `${notification.user_name} just went live!`
    })

    mongoClient.updateSubscribedUsers(creatorDoc._id, notificationDoc._id)
    appSocket.emitToAllSubscribedUsers(await mongoClient.getSubscribedUsersIds(creatorDoc._id), notificationDoc)
  }
})

notificationRouter.get('/youtube/callback', async (req, res) => {

})

notificationRouter.post('/youtube/callback', async (req, res) => {
  const { mediaId } = req.body;
  const mediaType = mediaId.includes("UC") ? "youtube" : false;
  const creator = await mongoClient.getCreatorByMedia(
    mediaType,
    mediaId
  );
  let notification;
  if (mediaType === "youtube") {
    notification = {
      creatorId: creator,
      creatorName: creator.twitch,
      mediaSource: "youtube",
      post: "new video was posted",
    };
  }
  const newNotification = await mongoClient.saveNotification(
    notification
  );
  const users = await mongoClient.updateSubscribedUsers(
    creator._id,
    newNotification._id
  );
  res.send(users);
});

module.exports = notificationRouter


// {
//   data: [
//     {
//       game_id: '509658',
//       id: '563743298',
//       language: 'fr',
//       started_at: '2020-09-09T04:49:56Z',
//       tag_ids: [Array],
//       thumbnail_url: 'https://static-cdn.jtvnw.net/previews-ttv/live_user_lestream-{width}x{height}.jpg',
//       title: 'NEXT >> JVCOM LE JOURNAL | lestream',
//       type: 'live',
//       user_id: '147337432',
//       user_name: 'lestream',
//       viewer_count: 1848
//     }
//   ]
// } 