const express = require('express')
const app = express()
const port = 3000

app.get('/', function (req, res) {
  res.send('bey World')
})

app.get('/hobbies', function (req, res){
  res.send('<ul><li>Coffes</li><li>Programing</li></ul>')
})

app.listen(3000, function(){
  console.log('Server connected to port ${port}')
})
