const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require("mongoose")
const firstSundays =require('./event.js')

const rosaryGroup = require('./models/rosaryGroup')
const rosaryMember = require('./models/rosaryMember')
const rosaryEvent = require('./models/rosaryEvent');
const event = require('./event.js');


const app = express()

// set port
const port = 3000

// set the view engine to ejs
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static("public"))

//mongoose
mongoose.connect("mongodb://localhost:27017/rosaryDB",{ 
  useUnifiedTopology: true,
  useNewUrlParser: true, 
}).then(() =>{
  console.log('Mongo connection open')
}).catch(()=>{
  console.log('Mongo connection error')
  console.log(err)
})



// index

app.get('/', function (req, res) {
  rosaryGroup.find({}, function(err, foundRG){
    res.render('./pages/index',{gropList: foundRG})
  })
})

app.post('/', async (req,res) =>{
  rosaryGroup.find({},(err,foundRG)=>{
  const nr = foundRG.length +1
  const name = req.body.name
  const newGroup = new rosaryGroup({
    name: name,
    order: nr
  })
  console.log(newGroup)
  newGroup.save()
})
  res.redirect('/')
})

//czlonkowie
app.get('/czlonkowie/:id',async(req,res) =>{
  const {id} = req.params
  const group = await rosaryGroup.findById(id)
  res.render('./pages/czlonkowie',{group})
})

app.post('/czlonkowie/:id',async(req,res) =>{
  const {id} = req.params
  const group = await rosaryGroup.findById(id)
  const newRosaryMember = new rosaryMember(req.body)
  group.rosaryMembers.push(newRosaryMember)
  group.save()
  res.redirect('/czlonkowie/' + id)
})
//Harmonograms

app.get('/harmonogram',function(req,res){
  const heders = event.firstSundays()

  res.render('pages/harmonogram',{heders})
})

app.listen(3000, function(){
  console.log('Server connected to port ' + port)
})
