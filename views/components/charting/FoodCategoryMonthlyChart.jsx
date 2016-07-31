import React from 'react'
import ReactDOM from 'react-dom'
import {browserHistory} from 'react-router'

import {connect} from 'react-redux';
import * as actionCreators from '../../src/action_creators';

import axios from 'axios'
import moment from 'moment'
import Chart from 'chart.js'

import chartconfig from '../../../config/chartconfig.js'
import Timekeeper from '../../src/timekeeper.js'


const FoodCategoryMonthlyChart = React.createClass({

    getInitialState : function(){
        return {
            cat_chart : null
        }
    },

    get_monthly_food_cat : function(){
        axios.post("/userdb/getusermonthfoodcat")
            .then(response => {
                console.log(response.data)
                if(this.state.cat_chart) this.state.cat_chart.destroy()
                var ctx = ReactDOM.findDOMNode(this.refs.myChart);
                var myPieChart = new Chart(ctx,{
                    type: 'pie',
                    data: chartconfig.monthly_food_cat_chart(response.data)
                });
                this.setState({monthly_chart : myPieChart})
            })
    },

    componentWillMount : function(){
        this.get_monthly_food_cat()
    },


    render : function(){
        return (
            <div className="card ">
                <div className="card-content">
                    <span className="card-title">Monthly Food Category</span>
                    <canvas ref="myChart" width="50" height="50"></canvas>
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

export default connect(mapStateToProps, actionCreators)(FoodCategoryMonthlyChart);
