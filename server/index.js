
const path = require('path')
const express = require('express')
const app = express()
const db = require('./db')

//logging middleware
const morgan = require('morgan')
app.use(morgan('dev'))

//serving up static resources from my server
app.use(express.static(path.join(__dirname, '../public/')))

//need middleware to parse  body for use in req.body
const bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

//this is pulling all the routes from the api folder
app.use('/api', require('./api'))

//this is sending our index.html file for anything that doesn't match any routes
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '../public/index.html')
)})

//so we can log 500 errors
app.use(function (err, req, res, next){
  console.log(err)
  console.log(err.stack)
  res.status(err.status || 500).send(err.message || 'Internal server error')
})

//this will start up the server
const port = process.env.PORT || 3000;

db.sync({force: true})
.then(
  app.listen(port, function() {
    console.log("Knock, knock")
    console.log("Who's there?")
    console.log(`Your server, listening on port ${port}`)
  })
)

