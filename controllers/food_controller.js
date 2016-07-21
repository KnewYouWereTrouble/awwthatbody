// Import the language driver ~
var MongoClient = require('mongodb').MongoClient
var ObjectID = require('mongodb').ObjectID;

// Connection URL ~
var dbconfig = require('../config/dbconfig.js')

exports.find_all_food = function(req, res, next){
    MongoClient.connect(dbconfig.url, function(err, db) {
        var food_collection = db.collection('food_collection');
        console.log(req.body.foodname)
        food_collection.find({ "Food Name" : {$regex :".?" + req.body.foodname + ".?", $options: 'i'} },
                             { "Food Name" : true}).toArray(function(err, docs){
            if(err) res.json(err)
            else{
                db.close()
                res.json(docs)
            }
        })
    })
}

exports.find_one_food = function(req, res, next){
    MongoClient.connect(dbconfig.url, function(err, db) {
        var food_collection = db.collection('food_collection');
        food_collection.findOne({"Food Name" : req.body.foodname}, function(err, food){
            if(err) res.json(err)
            else{
                db.close()
                res.json(food)
            }
        })
    })
}

exports.add_food = function(req, res, next){
    MongoClient.connect(dbconfig.url, function(err, db) {
        var food_collection = db.collection('food_collection');
        food_collection.findOne({"Food Name" : req.body.foodname}, function(err, food){
            if(err) res.json(err)
            else{
                req.food = food
                next()
            }
        })
    })
}

exports.remove_food = function(req, res, next){
    MongoClient.connect(dbconfig.url, function(err, db) {
        var food_collection = db.collection('food_collection');

        food_collection.findOne({"Food Name" : req.body.foodname}, function(err, food){
            if(err) res.json(err)
            else{
                req.food = food
                next()
            }
        })
    })
}


















///
