const axios = require("axios").default;
require("dotenv").config();

class YouTubeAPI {
  constructor() {
    this.baseUrl = "https://www.googleapis.com/youtube/v3/";
    this.api_key = process.env.YOUTUBE_API_KEY;
  }

  async getYoutubeLatestByRef(ref) {
    const uploadsId = (
      await axios(`
        ${this.baseUrl}channels?id=${ref}&key=${this.api_key}&part=contentDetails`)
    ).data.items[0].contentDetails.relatedPlaylists.uploads
    return (
      await axios(`
        ${this.baseUrl}playlistItems?playlistId=${uploadsId}&key=${this.api_key}&part=snippet&maxResults=1`)
    ).data.items[0].snippet.resourceId.videoId
  }

  parseYoutubeNotification(notification) {
    return notification.link.replace('<', ' ').replace('>', ' ').replace('=', ' ').split(' ').find(i => i.includes('UC'))
  }
}

module.exports = YouTubeAPI;