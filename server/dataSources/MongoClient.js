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

  isCookieValid(cookie) {
    return Models
      .User
      .findById(cookie)
      .lean()
  }

  getUserById(id) {
    return Models
      .User
      .findById(id)
      .select('favorites notifications')
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

  getCreatorsByPage(page) {
    return Models
      .Creator
      .find({})
      .skip((page - 1) * 12)
      .limit(12)
      .select('_id twitch img')
      .lean()
  }

  getAllCreators() {
    return Models
      .Creator
      .find({})
      .select('_id twitch img')
      .lean()
  }

  getSearchCreators(input, page) {
    return Models
      .Creator
      .find({ twitch: { $regex: ".*" + input + ".*", $options: 'i' } })
      .skip((page - 1) * 12)
      .limit(12)
      .select('_id twitch img')
      .lean()
  }

  getCreatorById(id) {
    return Models
      .Creator
      .findById(id)
      .lean()
  }

  getCreatorByTwitchName(mediaType, name) {
    return Models
      .Creator
      .find({ [mediaType]: name })
  }

  numOfallCreators() {
    return Models
      .Creator
      .estimatedDocumentCount({})
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