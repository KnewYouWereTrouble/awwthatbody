var User = require('./user')
var moment = require('moment')

exports.user_daily_cron = function(){
    User.find({}, function(err, docs){
        if(err) console.log(err)

        for(var i = 0; i < docs.length; i++){
            var daily_stats = docs[i].daily_stats
            docs[i].history_stats.unshift(daily_stats)
            docs[i].daily_stats = {
                date : moment().toDate(),
                energy : 0,
                protein : 0,
                fat_total : 0,
                carbohydrates : 0,
                dietary_fibre : 0,
                cholesterol : 0,
                calcium : 0,
                sodium : 0,
            }

            docs[i].history_breakfast.unshift(docs[i].breakfast)
            docs[i].history_lunch.unshift(docs[i].lunch)
            docs[i].history_dinner.unshift(docs[i].dinner)
            docs[i].history_supper.unshift(docs[i].supper)
            docs[i].history_snacks.unshift(docs[i].snacks)

            docs[i].breakfast = []
            docs[i].lunch = []
            docs[i].dinner = []
            docs[i].supper = []
            docs[i].snacks = []


            docs[i].save(function(err, docs){
                if(err)console.log(err)
            })
        }

    })
}

exports.user_monthly_cron = function(){
    User.find({}, function(err, docs){
        if(err) console.log(err)

        for(var i = 0; i < docs.length; i++){

            docs[i].month_meat = 0
            docs[i].month_vegetables = 0
            docs[i].month_seafood = 0
            docs[i].month_staples = 0
            docs[i].month_snacks = 0
            docs[i].month_drinks = 0
            docs[i].month_fastfood = 0

            docs[i].save(function(err, docs){
                if(err)console.log(err)
            })
        }

    })
}
