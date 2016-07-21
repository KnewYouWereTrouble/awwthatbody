import React from 'react'
import ReactDOM from 'react-dom'
import {browserHistory} from 'react-router'

import {connect} from 'react-redux';
import * as actionCreators from '../../src/action_creators';

import moment from 'moment'
import Chart from 'chart.js'

import Timekeeper from '../../src/timekeeper.js'
import chartconfig from '../../../config/chartconfig.js'
import axios from 'axios'



const DailyChart = React.createClass({

    getInitialState : function(){
        var week_range = Timekeeper.get_week_date_range()
        return {
            current_date : week_range.current_date,
            first_date_of_week : week_range.first_date,
            last_date_of_week : week_range.last_date,
            first_date_index : week_range.current_date.day(),
            last_date_index : 0,
            current_week : true,
            weekly_chart : null
        }
    },

    componentDidMount : function(){
        this.get_user_history_week(this.state.first_date_index, this.state.last_date_index, this.state.current_week)
    },


    get_user_history_week : function(first_date_index, last_date_index, current_week){
        axios.post('/userdb/getuserhistoryweek', {fdi : first_date_index, ldi : last_date_index})
            .then(response => {
                if(this.state.weekly_chart) this.state.weekly_chart.destroy()
                var ctx = ReactDOM.findDOMNode(this.refs.myChart);
                var myLineChart = new Chart(ctx, {
                    type: 'line',
                    data: chartconfig.weekly_chart_data(response.data, current_week),
                    options : chartconfig.weekly_chart_options
                });
                this.setState({weekly_chart : myLineChart})
            })
    },

    go_prev_week : function(){
        var week_range = Timekeeper.get_prev_week_range(this.state.first_date_of_week)
        var first_date_index = this.state.first_date_index + 7
        var last_date_index = this.state.first_date_index + 1
        this.setState({
            first_date_of_week : week_range.first_date,
            last_date_of_week : week_range.last_date,
            current_week : week_range.current_week,
            first_date_index : first_date_index,
            last_date_index : last_date_index,
        })
        this.get_user_history_week(first_date_index, last_date_index, week_range.current_week)
    },

    go_next_week : function(){
        var week_range = Timekeeper.get_next_week_range(this.state.last_date_of_week)
        var first_date_index = (this.state.last_date_index - 1 >= 0 ? this.state.last_date_index - 1 : this.state.current_date.day())
        var last_date_index = (first_date_index - 7 >= 0 ? this.state.last_date_index - 7 : 0)
        this.setState({
            first_date_of_week : week_range.first_date,
            last_date_of_week : week_range.last_date,
            current_week : week_range.current_week,
            first_date_index : first_date_index,
            last_date_index : last_date_index,
        })
        this.get_user_history_week(first_date_index, last_date_index, week_range.current_week)
    },




    render : function(){
        return (

            <div className="card">
                <div className="card-content">
                    <span className="card-title">Weekly Statistics</span>
                    <canvas ref="myChart" width="100%" height="30"></canvas>
                </div>
                <div className="card-action">
                    <a ref="chevron_left" onClick={this.go_prev_week} href="#!">&lt;</a>
                    <a>{this.state.first_date_of_week.format("MMM D 'YY")}&nbsp;&nbsp;-&nbsp;&nbsp;
                       {this.state.last_date_of_week.format("MMM D 'YY")}
                    </a>
                    {this.state.current_week ? "" : <a ref="chevron_right" onClick={this.go_next_week} href="#!">&gt;</a> }
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

export default connect(mapStateToProps, actionCreators)(DailyChart);
