import React from 'react'
import ReactDOM from 'react-dom'
import {browserHistory} from 'react-router'

import {connect} from 'react-redux';
import * as actionCreators from '../../src/action_creators';

import DailyFoodIntake from './DailyFoodIntake.jsx'
import DailyCalorieTargetChart from '../charting/DailyCalorieTargetChart.jsx'
import DailyMacrosTargetChart from '../charting/DailyMacrosTargetChart.jsx'
import Avatar from './Avatar.jsx'

import axios from 'axios'



const Dashboard = React.createClass({

    getInitialState : function(){
        return {
            gender : "-",
            statistics : {
                user_energy : "-",
                user_protein : "-",
                user_fat_total : "-",
                user_carbohydrates : "-",
                user_dietary_fibre : "-",
                user_cholesterol : "-",
                user_calcium : "-",
                user_sodium : "-",
            },
            user_daily_calorie_target : "-",
            user_breakfast : [],
            user_lunch : [],
            user_dinner : [],
            user_supper : [],
            user_snacks : [],
            ready : false
        }
    },

    getUserInfo : function(){
        axios.post('/userdb/getuser')
            .then(response => {

                this.setState({statistics : {
                                user_energy : response.data.daily_stats.energy,
                                user_protein : response.data.daily_stats.protein,
                                user_fat_total : response.data.daily_stats.fat_total,
                                user_carbohydrates : response.data.daily_stats.carbohydrates,
                                user_dietary_fibre : response.data.daily_stats.dietary_fibre,
                                user_cholesterol : response.data.daily_stats.cholesterol,
                                user_calcium : response.data.daily_stats.calcium,
                                user_sodium : response.data.daily_stats.sodium,
                                },
                                user_daily_calorie_target : response.data.daily_calorie_target,
                                user_breakfast : response.data.breakfast,
                                user_lunch : response.data.lunch,
                                user_dinner : response.data.dinner,
                                user_supper : response.data.supper,
                                user_snacks : response.data.snacks,
                                gender : response.data.gender,
                                ready : true})
            })
    },


    componentWillMount : function(){
        this.getUserInfo()
    },


    remove_food_breakfast : function(event){
        event.preventDefault()
        axios.post('/fooddb/removeFood',
            {foodname : event.target.parentNode.parentNode.childNodes[1].textContent, type : "breakfast"})
            .then(response => { this.getUserInfo() })

    },

    remove_food_lunch : function(event){
        event.preventDefault()
        axios.post('/fooddb/removeFood',
            {foodname : event.target.parentNode.parentNode.childNodes[1].textContent, type : "lunch"})
            .then(response => { this.getUserInfo() })
    },

    remove_food_dinner : function(event){
        event.preventDefault()
        axios.post('/fooddb/removeFood',
            {foodname : event.target.parentNode.parentNode.childNodes[1].textContent, type : "dinner"})
            .then(response => { this.getUserInfo() })
    },

    remove_food_supper : function(event){
        event.preventDefault()
        axios.post('/fooddb/removeFood',
            {foodname : event.target.parentNode.parentNode.childNodes[1].textContent, type : "supper"})
            .then(response => { this.getUserInfo() })
    },

    remove_food_snacks : function(event){
        event.preventDefault()
        axios.post('/fooddb/removeFood',
            {foodname : event.target.parentNode.parentNode.childNodes[1].textContent, type : "snacks"})
            .then(response => { this.getUserInfo() })
    },

    render : function(){
        return (
            <div>
                {this.state.ready  ?
                <div>
                <div className="row">
                    <div className="col s4">
                        <h3 className="condensed light">Daily Targets</h3>
                        <DailyCalorieTargetChart statistics={this.state.statistics}
                            user_daily_calorie_target={this.state.user_daily_calorie_target}/>
                    </div>
                    <div className="col s4">
                        <h3 className="condensed light">&nbsp;</h3>
                        <DailyMacrosTargetChart statistics={this.state.statistics}/>
                    </div>

                    <div className="col s4">
                        <Avatar gender={this.state.gender} statistics={this.state.statistics}
                            user_daily_calorie_target={this.state.user_daily_calorie_target}/>
                    </div>
                </div>

                <div className="row">
                    <div className="col s3">
                        <h4>Breakfast <i className="fa fa-coffee" aria-hidden="true"></i></h4>
                        <div className="divider"></div>
                        <DailyFoodIntake user_food_list={this.state.user_breakfast} remove_food={this.remove_food_breakfast}/>
                    </div>
                    <div className="col s2">
                        <h4>Lunch <i className="fa fa-sun-o" aria-hidden="true"></i></h4>
                        <div className="divider"></div>
                        <DailyFoodIntake user_food_list={this.state.user_lunch } remove_food={this.remove_food_lunch}/>
                    </div>
                    <div className="col s2">
                        <h4>Dinner <i className="fa fa-glass" aria-hidden="true"></i></h4>
                        <div className="divider"></div>
                        <DailyFoodIntake user_food_list={this.state.user_dinner} remove_food={this.remove_food_dinner}/>
                    </div>
                    <div className="col s3">
                        <h4>Supper <i className="fa fa-moon-o" aria-hidden="true"></i></h4>
                        <div className="divider"></div>
                        <DailyFoodIntake user_food_list={this.state.user_supper} remove_food={this.remove_food_supper}/>
                    </div>
                    <div className="col s2">
                        <h4>Snacks <i className="fa fa-lemon-o" aria-hidden="true"></i></h4>
                        <div className="divider"></div>
                        <DailyFoodIntake user_food_list={this.state.user_snacks} remove_food={this.remove_food_snacks}/>
                    </div>
                </div>
                </div>
                :
                <div className="progress">
                    <div className="indeterminate"></div>
                </div>
            }
            </div>
        )
    }


})

function mapStateToProps(state) {
  return {
    username: state.get('username')
  };
}

export default connect(mapStateToProps, actionCreators)(Dashboard);


/*
<div className="row">
    <div className="col s4 offset-s2"><DailyFoodIntake
        remove_food={this.remove_food}
        user_daily_food={this.state.user_daily_food} />
    </div>
</div>
*/
