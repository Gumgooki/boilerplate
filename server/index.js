
const path = require('path')
const express = require('express')
const app = express()
const db = require('./db')
const session = require('express-session')

//logging middleware
const morgan = require('morgan')
app.use(morgan('dev'))

//serving up static resources from my server
app.use(express.static(path.join(__dirname, '../public/')))

//need middleware to parse  body for use in req.body
const bodyParser = require('body-parser')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))


//configuring and creating our database store so we can save session data directly in DB
const sequelizeStore = require('connect-session-sequelize')(session.Store)
const dbStore = new sequelizeStore({db: db})

//sync the store so our session table gets created
dbStore.sync()

//this is optional middleware that gives us session information thats normally saved in memory
app.use(session({
  secret: process.env.SESSION_SECRET || 'super insecure secret',
  store: dbStore,
  resave: false,
  saveUninitialized: false
}))


//initializing passport to take in req.session and attach user to request obhect
const passport = require('passport')

app.use(passport.initialize())
app.use(passport.session())

passport.serializeUser((user, done) => {
  try {
    done(null, user.id)
  } catch(err){
    done(err)
  }
})

passport.deserializeUser(async (id, done) => {
  try {
    const user = await db.models.user.findByPk(id)
    done(null, user)
  } catch(err) {
    done(err)
  }
})

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

