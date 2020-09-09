const axios = require('axios').default

class TwitchAPI {
  constructor() {
    this.baseUrl = 'https://api.twitch.tv/kraken/streams'
    this.clientId = process.env.TWITCH_CLIENT_ID
  }

  async getTrendingByCategory(category, page) {
    if ((page - 1) * 100 > 900) { return [] }
    return (
      await axios({
        url:
          this.baseUrl +
          '?game=' +
          encodeURI(category).replace('&', '%26') +
          '&limit=100&offset=' +
          (page - 1) * 100,
        headers: {
          Accept: 'application/vnd.twitchtv.v5+json',
          'Client-ID': this.clientId,
        },
      })
    ).data.streams.map((stream) => stream.channel.name)
  }

  async getTrending(page) {
    if ((page - 1) * 100 > 900) { return [] }
    return (
      await axios({
        url: this.baseUrl + '?limit=50&offset=' + (page - 1) * 100,
        headers: {
          Accept: 'application/vnd.twitchtv.v5+json',
          'Client-ID': this.clientId,
        },
      })
    ).data.streams.map((stream) => stream.channel.name)
  }
}

module.exports = TwitchAPI
