const axios = require('axios').default
const YoutubeSubscriber = require('./zapierCrawler')

class NotificationHandler {
  constructor() {

  }

  async subscribeYoutube(channelID) {
    const subscribeStatus = await YoutubeSubscriber(channelID)
    return subscribeStatus
  }
}

module.exports = NotificationHandler
