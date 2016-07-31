// Import the language driver ~
var MongoClient = require('mongodb').MongoClient
var ObjectID = require('mongodb').ObjectID;

//Import model ~
var User = require("../models/user")

// Connection URL ~
var dbconfig = require('../config/dbconfig.js')

exports.get_recommendation = function(req, res, next){
    User.findOne({username : req.user.username}, function(err, user){
        if(err) res.json(err)
        else {
            var daily_calorie_target = user.daily_calorie_target
            var current_calorie = user.daily_stats.energy

            if(current_calorie > daily_calorie_target)
                res.json({status : "Overshot target, should stop eating."})
            else{
                var diff = daily_calorie_target - current_calorie
                MongoClient.connect(dbconfig.url, function(err, db) {
                    var food_collection = db.collection('food_collection');
                    food_collection.find({ "Energy (kcal)" : {$lt : diff} },
                                         { "Food Name" : true})
                                        .toArray(function(err, docs){
                        if(err) res.json(err)
                        else{
                            var arr = []
                            while(arr.length < 5){
                                var randomNum = Math.ceil(Math.random() * docs.length)
                                var found = false
                                for(var i = 0; i<arr.length; i++){
                                    if(arr[i] === randomNum) found = true; break;
                                }
                                if(!found) arr[arr.length] = randomNum
                            }
                            var reco = arr.map(function(i){return docs[i]})
                            console.log(reco)
                            db.close()
                            res.json(reco)
                        }
                    })
                })
            }
        }
    })
}




















///
