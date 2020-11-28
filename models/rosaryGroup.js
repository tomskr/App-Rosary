const  mongoose = require('mongoose')
const {Schema} = mongoose

const rosaryGroupSchema = Schema({
     order:{
        type: Number,
        unique: true
     },
     name: String,
     members:{
        type: Schema.Types.ObjectId,
        ref:'rosaryMember'
     }
})

const rosaryGroup = mongoose.model('rosaryGroup',rosaryGroupSchema)

module.exports = rosaryGroup;