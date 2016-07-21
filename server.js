var express = require('express')
var mongoose = require('mongoose')

var http = require('http')
//var https = require('spdy')
var path = require('path')
var fs = require('fs')

var morgan = require('morgan')
var bodyParser = require('body-parser')
var session = require('express-session')
var MongoStore = require('connect-mongo')(session)
var passport = require('passport')
var CronJob = require('cron').CronJob;

// Load controllers ~
var user_controller = require('./controllers/user_controller')
var auth_controller = require('./controllers/auth_controller')
var food_controller = require('./controllers/food_controller')

// Cron Job ~
var user_daily_cron = require('./models/user_daily_cron')

//config ~
var dbconfig = require('./config/dbconfig.js')

mongoose.connect(dbconfig.url)
const sessionStore = new MongoStore({mongooseConnection : mongoose.connection, ttl : dbconfig.ttl})

new CronJob('00 00 00 * * 0-6', function() {
  console.log('You will see this message at twelve midnight');
  user_daily_cron.user_daily_cron()
}, null, true, 'Singapore');


// session config ~
var express_session = session({
    secret : dbconfig.session_secret,
    saveUninitialized : false,
    resave : true,
    store : sessionStore,
    cookie : {}
})



var app = express()
app.use(express_session)


// Middleware ~
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(passport.initialize())
app.use(passport.session())
app.use(morgan('dev'))

// Disable CORS for Dev
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


// Static file dir ~
app.use(express.static(__dirname + '/dist'))

// Routing ~
var app_router = express.Router()


// Login routes ~
app_router.route('/')
    .get(function(req, res, next){
        if(req.user) res.redirect('/dashboard')
        else res.sendFile(path.resolve(__dirname, 'index.html'))
    })

app_router.route('/login')
    .get(user_controller.require_user_logout, function(req, res, next){
        res.sendFile(path.resolve(__dirname, 'index.html'))
    })
    .post(auth_controller.localAuthenticated, user_controller.login_user)

app_router.route('/signup')
    .post(user_controller.signup_user, auth_controller.localAuthenticated, user_controller.login_user)


app_router.route('/logout')
    .get(function(req, res, next){
        req.session.destroy(function(err){
            if(err) res.json(err)
        })
        res.redirect('/login')
    })


// Statsboard, Dashboard, Eat, Profile routes ~
app_router.route('/statsboard')
    .get(user_controller.require_user_login, function(req, res, next){
        res.sendFile(path.resolve(__dirname, 'index.html'))
    })

app_router.route('/dashboard')
    .get(user_controller.require_user_login, function(req, res, next){
        res.sendFile(path.resolve(__dirname, 'index.html'))
    })

app_router.route('/foodsearch')
    .get(user_controller.require_user_login, function(req, res, next){
        res.sendFile(path.resolve(__dirname, 'index.html'))
    })

app_router.route('/profile')
    .get(user_controller.require_user_login, function(req, res, next){
        res.sendFile(path.resolve(__dirname, 'index.html'))
    })


// User Query route ~
app_router.route("/userdb/getuser")
    .post(user_controller.require_user_login, user_controller.get_user_data)

app_router.route("/userdb/updateuser")
    .post(user_controller.update_user)

app_router.route("/userdb/getuserfoodhistory")
    .post(user_controller.get_user_food_history)

app_router.route("/userdb/getuserhistoryweek")
    .post(user_controller.get_user_history_week)

app_router.route("/userdb/getuserhistorymonth")
    .post(user_controller.get_user_history_month)


// Food DB Query routes ~
app_router.route('/fooddb/findAllFood')
    .post(user_controller.require_user_login, food_controller.find_all_food)

app_router.route('/fooddb/findOneFood')
    .post(user_controller.require_user_login, food_controller.find_one_food)


// User Food CRUD routes ~
app_router.route('/fooddb/addFood')
    .post(user_controller.require_user_login, food_controller.add_food, user_controller.user_add_food)


app_router.route('/fooddb/removeFood')
    .post(user_controller.require_user_login, food_controller.remove_food, user_controller.user_remove_food)





// 404 route ~
app_router.route('*')
    .get(function(req, res, next){
        res.send("Invalid page", 404)
    })


app.use(app_router)
app.set('PORT', process.env.PORT || 3000)

app.listen(app.get('PORT'), function(){
    console.log('Express server listening on port ' + app.get('PORT'))
})





















///
