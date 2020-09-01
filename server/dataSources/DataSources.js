const MongoClient = require('./MongoClient')

class DataSources {
  constructor() {
    this.mongoClient = new MongoClient()
  }
}

module.exports = DataSources