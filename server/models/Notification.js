const mongoose = require('mongoose')
const Schema = mongoose.Schema

const NotificationSchema = new Schema({
  creatorId: { type: Schema.Types.ObjectId, ref: 'Creator' },
  creatorName: String,
  mediaSource: String,
  post: String
}, { timestamps: true })

const Notification = mongoose.model('Notification', NotificationSchema)
module.exports = Notification