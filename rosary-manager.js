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
  useFindAndModify: false,
  useNewUrlParser: true, 
}).then(() =>{
  console.log('Mongo connection open')
}).catch(()=>{
  console.log('Mongo connection error')
  console.log(err)
})



//main

//grup/
app.get(['/group','/'], async (req, res) => {
    const groupList = await rosaryGroup.find({}).sort({"order":1})
    res.render('./pages/grupy/grupy.ejs',{groupList})
})

//group/new
//group/:id/edit
//group/:id/up
//group/:id/down

app.post('/group', async (req,res) =>{
  const groupList = await rosaryGroup.find({})
  const newGroup = new rosaryGroup({
    name: req.body.name,
    order: groupList.length + 1,
    active: req.body.active
  })
  newGroup.save()
  console.log(newGroup)
  res.redirect('/')
})

//group/:id/delete
app.get('/group/:id/delete', async (req, res) => {
  const rosaryInstance = await rosaryGroup.findByIdAndDelete(req.params.id)
   for(var tempNum = rosaryInstance.order;tempNum<=(await rosaryGroup.find()).length;tempNum++){
    let tempGroup = await rosaryGroup.findOneAndUpdate({order: (tempNum + 1)},{order: tempNum})
  }

  res.redirect('/group')
})

//czlonkowie
app.get('/czlonkowie/:id',async(req,res) =>{
  const {id} = req.params
  const group = await rosaryGroup.findById(id).populate('rosaryMembers')
  console.log(group)
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

app.post('/harmonogram',async(req,res) =>{
  event.populateEvents()
  res.redirect('harmonogram')
})

app.listen(3000, function(){
  console.log('Server connected to port ' + port)
})
