const  mongoose = require('mongoose')
const {Schema} = mongoose

const rosaryMemberSchema = new Schema({
    order: Number,
    firstName : String,
    lastName : String,
    phone: String,
    cellPhone: String,
    postKode: String,
    adress: String,
    yearJoining: String,
    nameDay: String,
    birthDay: String,
    pozition: String,
    status: String
})

const rosaryMember = mongoose.model('rosaryMember',rosaryMemberSchema)

module.exports = rosaryMember;
