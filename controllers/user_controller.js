var User = require("../models/user")
var moment = require('moment')

exports.require_user_login = function(req, res, next){
    if(!req.user) res.redirect('/login?loggedin=false')
    else next()
}

exports.require_user_logout = function(req, res, next){
    if(req.user) res.redirect('/dashboard')
    else next()
}

exports.signup_user = function(req, res, next){
    var user = new User()
    user.name = req.body.name,
    user.username = req.body.username,
    user.password = user.generateHash(req.body.password)
    user.email = req.body.email
    user.age = req.body.age
    user.weight = req.body.weight
    user.height = req.body.height
    user.gender = req.body.gender

    if(user.gender === "Male") user.daily_calorie_target = 2500
    else user.daily_calorie_target = 2000

    user.save(function(err, user){
        if(err){
            console.log(err)
            res.json(err);
        }
        else{
            next()
        }
    })
}

exports.login_user = function(req, res, next){
    User.findOne({username : req.body.username}, function(err, user){
        if(err) res.json(err)
        else res.json(user)
    })
}

exports.get_user_data = function(req, res, next){
    User.findOne({username : req.user.username}, function(err, user){
        if(err) res.json(err)
        else res.json(user)
    })
}

exports.get_user_history_week = function(req, res, next){
    User.findOne({username : req.user.username}, function(err, user){
        if(err) res.json(err)
        else {
            req.body.fdi += 1
            var history_stats = [user.daily_stats]
            history_stats = history_stats.concat(user.history_stats)
            history_stats = history_stats.slice(req.body.ldi, req.body.fdi)
            res.json(history_stats)
        }
    })
}

exports.get_user_history_month = function(req, res, next){
    User.findOne({username : req.user.username}, function(err, user){
        if(err) res.json(err)
        else {
            var history_stats = [user.daily_stats]
            history_stats = history_stats.concat(user.history_stats)

            if(req.body.monthIdx === 0){
                history_stats = history_stats.slice(0, moment().date())
            }
            else{
                var month = moment().subtract(1, "months")
                var num_days = moment().date()
                for(var i = 1; i < req.body.monthIdx; i++){
                    num_days += new Date(month.year(), month.month()+1, 0).getDate()
                    month.subtract(1, "months")
                }
                history_stats = history_stats.slice(num_days, new Date(month.year(), month.month()+1, 0).getDate())
            }
            res.json(history_stats)
        }
    })
}

exports.get_user_food_history = function(req, res, next){
    User.findOne({username : req.user.username}, function(err, user){
        if(err) res.json(err)
        else {
            var breakfast_history = [user.breakfast].concat(user.history_breakfast)
            var lunch_history = [user.lunch].concat(user.history_lunch)
            var dinner_history = [user.dinner].concat(user.history_dinner)
            var supper_history = [user.supper].concat(user.history_supper)
            var snacks_history = [user.snacks].concat(user.history_snacks)

            res.json([breakfast_history[req.body.dayIdx],
                      lunch_history[req.body.dayIdx],
                      dinner_history[req.body.dayIdx],
                      supper_history[req.body.dayIdx],
                      snacks_history[req.body.dayIdx]])

        }
    })
}

exports.get_user_food_cat = function(req, res, next){
    User.findOne({username : req.user.username}, function(err, user){
        if(err) res.json(err)
        else {
            res.json({
                month_meat : user.month_meat,
                month_vegetables : user.month_vegetables,
                month_seafood : user.month_seafood,
                month_drinks : user.month_drinks,
                month_snacks : user.month_snacks,
                month_staples : user.month_staples,
                month_fastfood : user.month_fastfood,
            })
        }
    })
}


exports.update_user = function(req, res, next){
    console.log("update user")
    User.findOne({username : req.user.username}, function(err, user){
        if(err) res.json(err)
        else {
            user.name = req.body.name
            user.username = req.body.username
            user.email = req.body.email
            user.weight = req.body.weight
            user.height = req.body.height
            user.daily_calorie_target = req.body.daily_calorie_target


            user.save(function(err, user){
                if(err){
                    console.log(err)
                    res.json(err);
                }
                else{
                    req.user = user
                    res.json(user)
                }
            })
        }
    })
}

exports.change_profile_pic = function(req, res, next){
    var data = req.body;
    // Was an image uploaded? If so, we'll use its public URL
    // in cloud storage.
    if (req.file && req.file.cloudStoragePublicUrl) {
      data.imageUrl = req.file.cloudStoragePublicUrl;

      User.findOne({username : req.user.username}, function(err, user){
          if(err) res.json(err)
          else {
              user.profile_pic = data.imageUrl
              user.save(function(err, user){
                  if(err) res.json(err);
                  else res.redirect("/profile")
              })
          }
      })

    }
}

exports.get_profile_pic = function(req, res, next){
  User.findOne({username : req.user.username}, function(err, user){
      if(err) res.json(err)
      else res.json(user)
    })
 }

exports.user_add_food = function(req, res, next){
    User.findOne({username : req.user.username}, function(err, user){
        if(err) res.json(err)
        else{
            console.log(req.food)
            console.log(req.body.type)
            switch(req.body.type){
                case "breakfast" :
                    user.breakfast.unshift(req.food["Food Name"])
                    break;
                case "lunch" :
                    user.lunch.unshift(req.food["Food Name"])
                    break;
                case "dinner" :
                    user.dinner.unshift(req.food["Food Name"])
                    console.log(user.dinner)
                    break;
                case "supper" :
                    user.supper.unshift(req.food["Food Name"])
                    break;
                case "snacks" :
                    user.snacks.unshift(req.food["Food Name"])
                    break;
            }

            user.daily_stats.energy += req.food["Energy (kcal)"]
            user.daily_stats.protein += Number((req.food["Protein (g)"]).toFixed(2))
            user.daily_stats.fat_total += req.food["Fat Total (g)"]
            user.daily_stats.cholesterol+= req.food["Cholesterol (mg)"]
            user.daily_stats.dietary_fibre += req.food["Dietary Fibre (g)"]
            user.daily_stats.carbohydrates+= req.food["Carbohydrates (g)"]
            user.daily_stats.calcium += isNaN(req.food["Calcium (mg)"]) ? 0 : req.food["Calcium (mg)"]
            user.daily_stats.sodium += req.food["Sodium (mg)"]

            switch(req.food.category){
                case "Meat" : user.month_meat += 1; break;
                case "Vegetables" : user.month_vegetables += 1; break;
                case "Snacks" : user.month_snacks += 1; break;
                case "Seafood" : user.month_seafood += 1; break;
                case "Drinks" : user.month_drinks += 1; break;
                case "Staples" : user.month_staples += 1; break;
                case "Fast Food" : user.month_fastfood += 1; break;
            }


            user.save(function(err, user){
                if(err) {
                    console.log(err)
                    res.json(err);
                }
                else {
                    console.log("no error")
                    res.json(user)
                }
            })
        }
    })
}


exports.user_remove_food = function(req, res, next){
    User.findOne({username : req.user.username}, function(err, user){
        if(err) res.json(err)
        else{
            var fIdx;
            switch(req.body.type){
                case "breakfast" :
                    fIdx = user.breakfast.indexOf(req.food["Food Name"])
                    user.breakfast = user.breakfast.slice(0, fIdx).concat(user.breakfast.slice(fIdx + 1))
                    break;
                case "lunch" :
                    fIdx = user.lunch.indexOf(req.food["Food Name"])
                    user.lunch = user.lunch.slice(0, fIdx).concat(user.lunch.slice(fIdx + 1))
                    break;
                case "dinner" :
                    fIdx = user.dinner.indexOf(req.food["Food Name"])
                    user.dinner = user.breakfast.slice(0, fIdx).concat(user.dinner.slice(fIdx + 1))
                    break;
                case "supper" :
                    fIdx = user.supper.indexOf(req.food["Food Name"])
                    user.supper = user.supper.slice(0, fIdx).concat(user.supper.slice(fIdx + 1))
                    break;
                case "snacks" :
                    fIdx = user.snacks.indexOf(req.food["Food Name"])
                    user.snacks = user.snacks.slice(0, fIdx).concat(user.snacks.slice(fIdx + 1))
                    break;
            }

            user.daily_stats.energy -= req.food["Energy (kcal)"]
            user.daily_stats.protein -= Number((req.food["Protein (g)"]).toFixed(2))
            user.daily_stats.fat_total -= req.food["Fat Total (g)"]
            user.daily_stats.cholesterol -= req.food["Cholesterol (mg)"]
            user.daily_stats.dietary_fibre -= req.food["Dietary Fibre (g)"]
            user.daily_stats.carbohydrates -= req.food["Carbohydrates (g)"]
            user.daily_stats.calcium -= isNaN(req.food["Calcium (mg)"]) ? 0 : req.food["Calcium (mg)"]
            user.daily_stats.sodium -= req.food["Sodium (mg)"]

            switch(req.food.category){
                case "Meat" : user.month_meat -= 1; break;
                case "Vegetables" : user.month_vegetables -= 1; break;
                case "Snacks" : user.month_snacks -= 1; break;
                case "Seafood" : user.month_seafood -= 1; break;
                case "Drinks" : user.month_drinks -= 1; break;
                case "Staples" : user.month_staples -= 1; break;
                case "Fast Food" : user.month_fastfood -= 1; break;
            }

            user.save(function(err, user){
                if(err) res.json(err);
                else res.json(user)
            })
        }
    })
}


















///
