var mongoose = require('mongoose')
var Schema = mongoose.Schema



var FoodSchema = new Schema({
        foodname : {type : String, required : true, unique : true},
        serving_portion : {type : String, required : true},
        serving_weight : {type : Number, required : true},
        energy : {type : Number, required : true},
        protein : {type : Number, required : true},
        fat_total : {type : Number, required : true},
        carbohydrates : {type : Number, required : true},
        dietary_fibre : {type : Number, required : true},
        cholesterol : {type : Number, required : true},
        calcium : {type : Number, required : true},
        sodium : {type : Number, required : true},
})

module.exports = mongoose.model('Food', FoodSchema)
