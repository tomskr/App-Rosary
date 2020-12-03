const  mongoose = require('mongoose')
const {Schema} = mongoose

const rosaryEventSchema = new Schema({
  startDate: String,
  stopDate: String,
  rosaryGroup: {
    type: Schema.Types.ObjectId,
    ref:'rosaryGroup'}
})


const rosaryEvent = mongoose.model('rosaryEvent',rosaryEventSchema)

module.exports = rosaryEvent;