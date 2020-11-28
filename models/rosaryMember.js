const  mongoose = require('mongoose')
const {Schema} = mongoose

const rosaryMemberSchema = new Schema({
    firstName : String,
    lastName : String
})

const rosaryMember = mongoose.model('rosaryMember',rosaryMemberSchema)

module.exports = rosaryMember;
