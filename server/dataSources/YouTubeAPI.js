const axios = require('axios').default
require('dotenv').config()

class YouTubeAPI {
  constructor() {
    this.baseUrl = 'https://www.googleapis.com/youtube/v3/search'
    this.api_key = process.env.YOUTUBE_API_KEY
  }

  async getYoutubeLatestByRef(ref) {
    return (await axios(this.baseUrl + '?part=snippet&channelId=' + ref + '&maxResults=10&order=date&type=video&key=' + this.api_key)).data.items[0].id.videoId
  }
}

module.exports = YouTubeAPI