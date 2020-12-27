const  mongoose = require('mongoose')
const {Schema} = mongoose

const rosaryEventSchema = new Schema({
  startDate: String,
  stopDate: String
})


const rosaryEvent = mongoose.model('rosaryEvent',rosaryEventSchema)

module.exports = rosaryEvent;