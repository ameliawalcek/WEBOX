require('mongoose').connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
const Models = require('../models/Models')

class MongoClient {
  async getDocById(collection, id) {
    return Models[collection].findById(id)
  }

  async getUserByName(userName) {
    return Models
      .User
      .find({ userName: userName })
      .lean()
  }

  async getUserById(id) {
    return Models
      .User
      .findById(id)
      .populate({ path: 'favorites', options: { lean: true } })
      .populate({ path: 'notifications', options: { lean: true } })
      .lean()
  }

  async addUser(userDoc) {
    return new Models
      .User(userDoc)
  }

  async addFavoriteToUser(creatorId, userId) {
    const creatorDoc = await this.getDocById('Creator', creatorId)
    return Models
      .User
      .findByIdAndUpdate(
        userId,
        { $push: { favorites: creatorDoc } },
        { new: true }
      )
      .lean()
  }

  async removeFavoriteFromUser(creatorId, userId) {
    const creatorDoc = await this.getDocById('Creator', creatorId)
    return Models
      .User
      .findByIdAndUpdate(
        userId,
        { $pull: { favorites: { _id: creatorDoc._id } } },
        { new: true }
      )
      .lean()
  }

  async getAllCreators() {
    return Models
      .Creator
      .find({})
      .lean()
  }

  async getCreatorById(id) {
    return Models
      .Creator
      .findById(id)
      .lean()
  }

  async saveNotification(notificationDoc) {
    return new Models
      .Notification(notificationDoc)
      .save()
  }

  async removeNotificationFromUser(notificationId, userId) {
    const notificationDoc = await this.getDocById('Notification', notificationId)
    return Models
      .User
      .findByIdAndUpdate(
        userId,
        { $pull: { notifications: { _id: notificationDoc._id } } },
        { new: true }
      )
      .lean()
  }
}

module.exports = MongoClient