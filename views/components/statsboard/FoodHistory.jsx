import React from 'react'
import ReactDOM from 'react-dom'
import {browserHistory} from 'react-router'

import {connect} from 'react-redux';
import * as actionCreators from '../../src/action_creators';

import Timekeeper from '../../src/timekeeper.js'
import axios from 'axios'


const DailyFoodIntake = React.createClass({

    getInitialState : function(){
        var week_range = Timekeeper.get_week_date_range()
        return {
            dayIdx : 0,
            current_date : week_range.current_date,
            breakfast_history : [],
            lunch_history : [],
            dinner_history : [],
            supper_history : [],
            snacks_history : []
        }
    },

    componentDidMount : function(){
        this.get_user_food_history(this.state.dayIdx)
    },

    get_user_food_history : function(dayIdx){
        axios.post('/userdb/getuserfoodhistory', {dayIdx : dayIdx})
            .then(response => {
                this.setState({
                    breakfast_history : response.data[0] || [],
                    lunch_history : response.data[1] || [],
                    dinner_history : response.data[2] || [],
                    supper_history : response.data[3] || [],
                    snacks_history : response.data[4] || [],
                })
            })
    },

    go_yesterday : function(){
        this.get_user_food_history(this.state.dayIdx + 1)
        this.setState({current_date : this.state.current_date.subtract(1, "days"), dayIdx : this.state.dayIdx + 1})
    },

    go_tomorrow : function(){
        this.get_user_food_history(this.state.dayIdx - 1)
        this.setState({current_date : this.state.current_date.add(1, "days"), dayIdx : this.state.dayIdx - 1})
    },


    render : function(){
        return (
                <div className="card ">

                    <div className="card-content ">
                        <span className="card-title">Food History</span>

                        <ul className="collection stats-food-history">
                            {this.state.breakfast_history.map(function(food, index){
                                return (
                                    <li className="collection-item" key={index}>
                                        {food}
                                        <i className="fa fa-coffee secondary-content" aria-hidden="true"></i>
                                    </li>)
                            }.bind(this))}
                            {this.state.lunch_history.map(function(food, index){
                                return (
                                    <li className="collection-item" key={index}>
                                        {food}
                                        <i className="fa fa-sun-o secondary-content" aria-hidden="true"></i>
                                    </li>)
                            }.bind(this))}
                            {this.state.dinner_history.map(function(food, index){
                                return (
                                    <li className="collection-item" key={index}>
                                        {food}
                                        <i className="fa fa-glass secondary-content" aria-hidden="true"></i>
                                    </li>)
                            }.bind(this))}
                            {this.state.supper_history.map(function(food, index){
                                return (
                                    <li className="collection-item" key={index}>
                                        {food}
                                        <i className="fa fa-moon-o secondary-content" aria-hidden="true"></i>
                                    </li>)
                            }.bind(this))}
                            {this.state.snacks_history.map(function(food, index){
                                return (
                                    <li className="collection-item" key={index}>
                                        {food}
                                        <i className="fa fa-lemon-o secondary-content" aria-hidden="true"></i>
                                    </li>)
                            }.bind(this))}
                        </ul>

                    </div>


                    <div className="card-action">
                        <a ref="chevron_left" onClick={this.go_yesterday} href="#!">&lt;</a>
                        <a>{this.state.current_date.format("MMM D")}</a>
                        {this.state.dayIdx === 0 ? "" : <a ref="chevron_right" onClick={this.go_tomorrow} href="#!">&gt;</a> }
                    </div>

                </div>




        )
    }


})

function mapStateToProps(state) {
  return {
    username: state.get('username')
  };
}

export default connect(mapStateToProps, actionCreators)(DailyFoodIntake);
