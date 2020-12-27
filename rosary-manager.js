const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require("mongoose")
const firstSundays =require('./event.js')
const moment = require('moment');

const rosaryGroup = require('./models/rosaryGroup')
const rosaryMember = require('./models/rosaryMember')
const rosaryEvent = require('./models/rosaryEvent');
const event = require('./event.js');
const { json } = require('body-parser')

const app = express()

// set port
const port = 3000

// set the view engine to ejs
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static(__dirname + '/public'));




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
    const editmode = ['edit-mode-on',null]
    //temp
    res.render('./pages/grupy.ejs',{groupList,editmode})
})

//group/new
app.post('/group', async (req,res) =>{
  const groupList = await rosaryGroup.find({})
  const newGroup = new rosaryGroup({
    name: req.body.name,
    order: groupList.length + 1,
    active: req.body.active
  })
  newGroup.save()
  console.log(newGroup)
  res.redirect('/group')
})

//group/:id/edit (get)
app.get('/group/:id/edit', async (req,res) =>{
  const groupList = await rosaryGroup.find({}).sort({"order":1})
  const editmode = ['single-edit-mode',req.params.id]
  console.log('edit')
  res.render('./pages/grupy.ejs',{groupList,editmode})
})

//group/:id/edit (post)
app.post('/group/:id/edit', async (req,res) =>{
  console.log(req.body)
  const rosaryGroupInst = await rosaryGroup.findByIdAndUpdate({_id:req.params.id},(req.body))
  res.redirect('/group')
})

//group/:id/up
app.get('/group/:id/up', async (req, res) => {
  //order =! 1
  let mainGroupDoc = await rosaryGroup.findById(req.params.id)
  if( mainGroupDoc.order != 1 ){
    await rosaryGroup.findOneAndUpdate({order : mainGroupDoc.order -1},{order:mainGroupDoc.order})
    mainGroupDoc.order=mainGroupDoc.order-1
    mainGroupDoc.save()
    console.log('up')
  }
  res.redirect('/group')
})

//group/:id/down
app.get('/group/:id/down', async (req, res) => {
  //order =! max
  let mainGroupDoc = await rosaryGroup.findById(req.params.id)
  if(  mainGroupDoc.order != (await rosaryGroup.find()).length){
    //swap order numbers
    await rosaryGroup.findOneAndUpdate({order : mainGroupDoc.order +1},{order:mainGroupDoc.order})
    mainGroupDoc.order=mainGroupDoc.order+1
    mainGroupDoc.save()
    console.log('down')
  }
  res.redirect('/group')
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

app.get('/harmonogram',async function(req,res){
  const heders = event.firstSundays()
  const groupList = await rosaryGroup.find().populate('rosaryEvents')
  let rosaryHarmonogram = []
  for(let x = 0;x<groupList.length;x++){
    rosaryHarmonogram.push("<tr>")
    rosaryHarmonogram.push("<td class = \"tablegroup \">"+(x+1)+". " + groupList[x].name + "</td>")
    if(groupList[x].active){
    for(let j = 0;j<12;j++){
    rosaryHarmonogram.push("<td></td>")
    }}else{
      for(let j = 0;j<12;j++){
        rosaryHarmonogram.push("<td><hr size=\"2\" width=\"90%\" color=\"black\">  </td>")
    }}

      for(let y = 0; y < groupList[x].rosaryEvents.length;y++){
      if(groupList[x].rosaryEvents.length){
      let position = ((moment(groupList[x].rosaryEvents[y].startDate + "T04:30").dayOfYear() *43)/366) - 44

      console.log(position)
      rosaryHarmonogram.push(
      "<td class = \"paneldate\" style = \" margin-left :" 
      +  position 
      +"%;\">" 
      + groupList[x].rosaryEvents[y].startDate.substring(8,10)
      + "-"
      + groupList[x].rosaryEvents[y].stopDate.substring(8,10) 
      + "</td>")
      }
    }
    rosaryHarmonogram.push("</tr>")
  }
  rosaryHarmonogram.push('end')
  // console.log(rosaryHarmonogram)
  res.render('pages/harmonogram',{heders,rosaryHarmonogram})
  //res.json(groupList)

})

app.post('/harmonogram',async(req,res) =>{
  event.populateEvents()
  res.redirect('/harmonogram')
})

app.listen(3000, function(){
  console.log('Server connected to port ' + port)
})
