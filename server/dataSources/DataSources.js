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
    // const instagramPostId = this.instagramAPI.getRecentPostByRef(creator.instagram).then(d => d).catch(e => console.log(e))
    const youtubeVideoId = await this.youtubeAPI.getYoutubeLatestByRef(creator.youtube).catch(e => console.log(e))
    return {
      imgUrl: creator.img,
      twitchName: creator.twitch,
      twitterName: creator.twitter,
      youtubeVideoId,
      instagramPostId: 'CEr9mwghtMk'
    }
  }

  async findNewCreator(creator) {

    return {
      imgUrl: creator.img,
      twitchName: creator.twitch,
    }
  }
}

const dataSources = new DataSources()
module.exports = dataSources