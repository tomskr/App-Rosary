const  mongoose = require('mongoose')
const {Schema} = mongoose

const rosaryGroupSchema = Schema({
     order: Number,
     name: String,
     //Active:1 pasive:0
     active: Boolean,
     rosaryMembers:[{
        type: Schema.Types.ObjectId,
        ref:'rosaryMember'
     }]
})

const rosaryGroup = mongoose.model('rosaryGroup',rosaryGroupSchema)

module.exports = rosaryGroup;