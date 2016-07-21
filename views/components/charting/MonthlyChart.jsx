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
            monthIdx : 0,
            monthly_chart : null
        }
    },

    componentDidMount : function(){
        this.get_user_history_month(this.state.monthIdx)
    },


    get_user_history_month : function(monthIdx){
        axios.post('/userdb/getuserhistorymonth', {monthIdx : monthIdx})
            .then(response => {
                if(this.state.monthly_chart) this.state.monthly_chart.destroy()
                var ctx = ReactDOM.findDOMNode(this.refs.myChart);
                var myLineChart = new Chart(ctx, {
                    type: 'line',
                    data: chartconfig.monthly_chart_data(response.data, monthIdx),
                    options : chartconfig.monthly_chart_options
                });
                this.setState({monthly_chart : myLineChart})

            })
    },

    go_prev_month : function(){
        this.get_user_history_month(this.state.monthIdx + 1)
        this.setState({current_date : this.state.current_date.subtract(1, "months"), monthIdx : this.state.monthIdx + 1})
    },

    go_next_month : function(){
        this.get_user_history_month(this.state.monthIdx - 1)
        this.setState({current_date : this.state.current_date.add(1, "months"), monthIdx : this.state.monthIdx - 1})
    },




    render : function(){
        return (
            <div className="card">
                <div className="card-content">
                    <span className="card-title">Monthly Statistics</span>
                    <canvas ref="myChart" width="100%" height="25"></canvas>
                </div>
                <div className="card-action">
                    <a ref="chevron_left" onClick={this.go_prev_month} href="#!">&lt;</a>
                    <a>{this.state.current_date.format("MMM 'YY")}</a>
                    {this.state.monthIdx === 0 ? "" : <a ref="chevron_right" onClick={this.go_next_month} href="#!">&gt;</a> }
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
