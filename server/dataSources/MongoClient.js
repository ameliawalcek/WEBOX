require('dotenv').config()
require('mongoose').connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
const Models = require('../models/Models')

class MongoClient {
  getDocById(collection, id) {
    return Models[collection].findById(id)
  }

  getUserByName(userName) {
    return Models
      .User
      .findOne({ userName: userName })
      .lean()
  }

  getUserById(id) {
    return Models
      .User
      .findById(id)
      .populate({ path: 'favorites', options: { lean: true } })
      .populate({ path: 'notifications', options: { lean: true } })
      .lean()
  }

  addUser(userDoc) {
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
        { $pull: { favorites: creatorDoc._id } },
        { new: true }
      )
      .lean()
  }

  getAllCreators() {
    return Models
      .Creator
      .find({})
      .select('_id twitch img')
      .lean()
  }

  getCreatorById(id) {
    return Models
      .Creator
      .findById(id)
      .lean()
  }

  saveNotification(notificationDoc) {
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
        { $pull: { notifications: notificationDoc._id } },
        { new: true }
      )
      .lean()
  }
}

module.exports = MongoClient