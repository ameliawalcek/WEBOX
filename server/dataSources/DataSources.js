const MongoClient = require('./MongoClient')
const TwitchAPI = require('./TwitchAPI')
const InstagramAPI = require('./InstagramAPI')
const YouTubeAPI = require('./YouTubeAPI')

class DataSources {
  constructor() {
    this.mongoClient = new MongoClient()
    this.twitchAPI = new TwitchAPI()
    this.instagramAPI = new InstagramAPI()
    this.youtubeAPI = new YouTubeAPI()
  }

  async getCreatorLinksByid(id) {
    const creator = await this.mongoClient.getCreatorById(id)
    const [youtubeVideoId, instagramPostId] = await Promise.all([
      // this.youtubeAPI.getYoutubeLatestByRef(creator.youtube),
      this.instagramAPI.getRecentPostByRef(creator.instagram)
    ]).catch(e => console.log(e.response))
    console.log(instagramPostId)
    return {
      imgUrl: creator.img,
      twitchName: creator.twitch,
      twitterName: creator.twitter,
      youtubeVideoId,
      instagramPostId
    }
  }
}

const dataSources = new DataSources()
module.exports = dataSources