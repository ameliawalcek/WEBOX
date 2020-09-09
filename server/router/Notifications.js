const express = require('express')
const { mongoClient } = require('../dataSources/DataSources')
const notificationsRouter = express.Router()

notificationsRouter.get('/twitch/callback', (req, res) => {
  res.type('text/plain').send('hub.challenge ' + req.query['hub.challenge'])
})

notificationsRouter.post('/twitch/callback', async (req, res) => {
  res.sendStatus(200)
  const { data } = req.body
  if (data.length) {
    const notification = data[0]
    const creatorDoc = await mongoClient.getCreatorByTwitchName(notification.user_name)
    const notificationDoc = await mongoClient.saveNotification({
      creatorId: creatorDoc,
      creatorName: notification.user_name,
      mediaSource: 'Twitch',
      post: `${notification.user_name} just went live!`
    })
    const 
  }
})

module.exports = notificationsRouter


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