const axios = require('axios').default

class InstagramAPI {
  constructor() {
    this.baseUrl = 'https://www.instagram.com/'
  }

  async getRecentPostByRef(ref) {
    try {
      const instagramGql = await axios(this.baseUrl + ref + '?__a=1')
      console.log(instagramGql.data)
      // if (instagramGql.data) {
      //   return instagramGql.data.graphql.user.edge_owner_to_timeline_media.edges[0].node.shortcode
      // }
      return null
    }
    catch (e) {
      return null
    }
  }
}

module.exports = InstagramAPI