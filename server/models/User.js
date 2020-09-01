const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  username: String,
  password: String,
  email: String,
  favorites: [{ type: Schema.Types.ObjectId, ref: 'Creator' }],
  subscribed: Boolean,
  notifications: [{ type: Schema.Types.ObjectId, ref: 'Notification' }]
})

const User = mongoose.model('User', UserSchema)
module.exports = User