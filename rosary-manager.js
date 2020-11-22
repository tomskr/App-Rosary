const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require("mongoose")

const app = express()

// set port
const port = 3000

// set the view engine to ejs
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static("public"))

mongoose.connect("mongodb://localhost:27017/rosaryDB",{ useNewUrlParser: true },{ useUnifiedTopology: true })

const rosaryGroupSchema = {
  index: Number,
  name: String,
};

const RosaryGroup = mongoose.model("RosaryGroup",rosaryGroupSchema)

const group1 = new RosaryGroup({
  index: 1,
  name: "Teresa"
})

const group2 = new RosaryGroup({
  index: 2,
  name: "Antoni"
})

const group3 = new RosaryGroup({
  index: 3,
  name: "Maria"
})

const defaultRosaryGroups = [group1, group2, group3]

RosaryGroup.insertMany(defaultRosaryGroups, function(err){
  if(err){
    console.log(err)
  }else{
    console.log("Success")
  }
})



app.get('/', function (req, res) {
  RosaryGroup.find({}, function(err, foundRG){
    console.log(foundRG)
    res.render("index",{gropList: foundRG})
  })
})

app.post('/', function(req,res){
  let item = req.body.groupName
  rosaryGroups.push(item);
  res.redirect('/')
})



app.listen(3000, function(){
  console.log('Server connected to port ' + port)
})
