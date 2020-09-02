const axios = require('axios').default

class InstagramAPI {
  constructor() {
    this.baseUrl = 'https://www.instagram.com/'
  }

  async getRecentPostByRef(ref) {
    return (await axios(this.baseUrl + ref + '?__a=1')).data.graphql.user.edge_owner_to_timeline_media.edges[0].node.shortcode
  }
}

module.exports = InstagramAPI