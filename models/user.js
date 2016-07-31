var mongoose = require('mongoose')
var Schema = mongoose.Schema
var bcrypt = require('bcrypt-nodejs')
var moment = require('moment')

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}


var UserSchema = new Schema({
        name : {type : String, required : true},
        username : {type : String, unique : true, required: true},
        email : {type : String, unique : true, required: true, validate : [validateEmail, "Invalid email"]},
        password : {type : String, required : true},
        age : {type : Number , required : true},
        height : {type : Number , required : true},
        weight : {type : Number , required : true},
        gender : {type : String , required : true},

        daily_calorie_target : {type : Number, required : true},

        daily_stats : {
            date : { type: Date, default: moment().toDate() },
            energy : {type : Number, default : 0},
            protein : {type : Number,  default : 0},
            fat_total : {type : Number,  default : 0},
            carbohydrates : {type : Number, default : 0},
            dietary_fibre : {type : Number, default : 0},
            cholesterol : {type : Number, default : 0},
            calcium : {type : Number, default : 0},
            sodium : {type : Number, default : 0},
        },

        history_stats : [
            {
                date : { type: Date, default: moment().toDate() },

                energy : {type : Number, default : 0},
                protein : {type : Number,  default : 0},
                fat_total : {type : Number,  default : 0},
                carbohydrates : {type : Number, default : 0},
                dietary_fibre : {type : Number, default : 0},
                cholesterol : {type : Number, default : 0},
                calcium : {type : Number, default : 0},
                sodium : {type : Number, default : 0},
            }
        ],

        breakfast : [],
        lunch : [],
        dinner : [],
        supper : [],
        snacks : [],

        history_breakfast : [],
        history_lunch : [],
        history_dinner : [],
        history_supper : [],
        history_snacks : [],

        month_meat : {type : Number, required : true, default : 0},
        month_vegetables : {type : Number, required : true, default : 0},
        month_seafood : {type : Number, required : true, default : 0},
        month_staples : {type : Number, required : true, default : 0},
        month_snacks : {type : Number, required : true, default : 0},
        month_drinks : {type : Number, required : true, default : 0},
        month_fastfood : {type : Number, required : true, default : 0},

        profile_pic : {type : String, required : true, default : "./dp.jpg"},



})


UserSchema.methods.generateHash = function(password){
    return bcrypt.hashSync(password)
}
UserSchema.methods.verifyPassword = function(password){
    return bcrypt.compareSync(password, this.password)
}

module.exports = mongoose.model('User', UserSchema)


/*
facebook_id : String,
facebook_token : String
*/
