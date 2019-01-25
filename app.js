var express = require('express')
var path = require('path')
var logger = require('morgan')
var bodyParser = require('body-parser')
var ToDoList = require('./router/ToDoList')
var cors = require('cors')
var app = express()
var mongoose = require('mongoose')

// replace the uri string with your connection string.
var uri = 'mongodb+srv://Test:' + process.env.Mongo_Atlas_PW + '@cluster0-tvykb.mongodb.net/ToDoList?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true'

var uril = 'mongodb://Test:' + process.env.Mongo_Atlas_PW + '@cluster0-shard-00-01-tvykb.mongodb.net:27017/ToDoList?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true'

mongoose.connect(uri, { useNewUrlParser: true })
  .then(db => console.log('DB connected'))
  .catch(err => console.error(err))

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({'extended': 'false'}))
app.use('/ToDoList', ToDoList)

app.get('/', (req, res, next) =>{
  res.json({
    status: 'Done'
  })
})

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

module.exports = app
