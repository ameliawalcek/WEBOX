const axios = require('axios').default

class TwitchAPI {
  constructor() {
    this.baseUrl = 'https://api.twitch.tv/kraken/streams'
    this.clientId = process.env.TWITCH_CLIENT_ID
  }

  async getTrendingByCategory(category) {
    return (await axios({
      url: this.baseUrl,
      params: {
        game: category
      },
      headers: {
        'clientId': this.clientId
      }
    }))
      .data.streams.map(stream => stream.channel.name)
  }

  async getTrending() {
    return (await axios({
      url: this.baseUrl,
      headers: {
        'clientId': this.clientId
      }
    }))
      .data.streams.map(stream => stream.channel.name)
  }
}

module.exports = TwitchAPI