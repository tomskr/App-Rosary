const  mongoose = require('mongoose')
const {Schema} = mongoose

const rosaryEvent = require("./rosaryEvent")

const rosaryGroupSchema = Schema({
     order: Number,
     name: String,
     //Active:1 pasive:0
     active: Boolean,
     rosaryMembers:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'rosaryMember',
     }],
     rosaryEvents:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "rosaryEvent"
        
     }]
})


const rosaryGroup = mongoose.model('rosaryGroup',rosaryGroupSchema)

module.exports = rosaryGroup;