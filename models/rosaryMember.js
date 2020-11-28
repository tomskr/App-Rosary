const  mongoose = require('mongoose')
const {Schema} = mongoose

const rosaryMemberSchema = new Schema({
    index: Number,
    name: String,
    rosaryMembers: []
})

const rosaryMember = mongoose.model('rosaryMember',rosaryMemberSchema)

module.exports = rosaryMember;
