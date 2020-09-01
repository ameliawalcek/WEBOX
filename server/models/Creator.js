const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CreatorSchema = new Schema({
  twitch: String,
  youtube: String,
  twitter: String,
  instagram: String,
  img: String
})

const Creator = mongoose.model('Creator', CreatorSchema)
module.exports = Creator