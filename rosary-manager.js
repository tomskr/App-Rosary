const express = require('express')
const bodyParser = require('body-parser')
const app = express()
// set port
const port = 3000
// global variables
let rosaryGroups = ["Rosary1","Rosary2"]

// set the view engine to ejs
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}))

app.get('/', function (req, res) {
  res.render("index",{gropList: rosaryGroups})
})

app.post('/', function(req,res){
  let item = req.body.groupName
  rosaryGroups.push(item);
  res.redirect('/')
})



app.listen(3000, function(){
  console.log('Server connected to port ' + port)
})
