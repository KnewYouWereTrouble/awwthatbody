var moment = require('moment')

exports.get_week_date_range = function(){
    var current_date = moment()
    var current_day = current_date.day()
    var first_date_of_week = moment().weekday(0)
    var last_date_of_week = moment().weekday(6)

    return {
        current_date : current_date,
        first_date : first_date_of_week,
        last_date : last_date_of_week
    }
}

exports.get_prev_week_range = function(first_date_of_week){
    
    var first_date_of_prev_week = moment(first_date_of_week).weekday(-7)
    var last_date_of_prev_week = moment(first_date_of_prev_week).weekday(6)

    return {
        first_date : first_date_of_prev_week,
        last_date : last_date_of_prev_week,
        current_week : first_date_of_prev_week.week() === moment().week()
    }
}

exports.get_next_week_range = function(last_date_of_week){
    var last_date_of_next_week = moment(last_date_of_week).weekday(+13)
    var first_date_of_next_week = moment(last_date_of_next_week).weekday(0)


    return {
        first_date : first_date_of_next_week,
        last_date : last_date_of_next_week,
        current_week : first_date_of_next_week.week() === moment().week()
    }
}
