const axios = require('axios').default
const YoutubeSubscriber = require('./zapierCrawler')

class NotificationHandler {
  constructor() {

  }
  async subscribeYoutube(channelID) {
    const subscribeStatus = await YoutubeSubscriber(channelID)
    return subscribeStatus
  }

// handle push of new notifications - you're getting an identifier for the creator
// create a notification using the thing below  
//   if (response) {
//     const res = await dataSources.mongoClient.saveNotification({
//       creatorId: creatorId,
//       mediaSource: "youtube",
//       post: "uploaded a new video!",
//     });
//   }
}

module.exports = NotificationHandler
