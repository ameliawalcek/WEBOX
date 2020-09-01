const MongoClient = require('./MongoClient')
const TwitchAPI = require('./TwitchAPI')

class DataSources {
  constructor() {
    this.mongoClient = new MongoClient()
    this.TwitchAPI = new TwitchAPI()
  }
}

const dataSources = new DataSources()
module.exports = dataSources