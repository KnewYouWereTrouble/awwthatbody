import React from 'react'
import ReactDOM from 'react-dom'
import {browserHistory} from 'react-router'

import {connect} from 'react-redux';
import * as actionCreators from '../../src/action_creators';

import moment from 'moment'
import Chart from 'chart.js'

import Timekeeper from '../../src/timekeeper.js'

var data = {
    labels: [
        "Meat",
        "Fish",
        "Vegetables",
        "Drinks",
        "Fruits",
        "Staples"
    ],
    datasets: [
        {
            data: [300, 50, 100, 400, 200, 230],
            backgroundColor: [
                "#FF6384",
                "#36A2EB",
                "#FFCE56",
                "#ab47bc",
                "#64ffda",
                "#bdbdbd",

            ],
            hoverBackgroundColor: [
                "#FF6384",
                "#36A2EB",
                "#FFCE56",
                "#ab47bc",
                "#64ffda",
                "#bdbdbd",
            ]
        }]
};


const FoodCategoryMonthlyChart = React.createClass({

    getInitialState : function(){
        return {}
    },

    componentDidMount : function(){
        var ctx = ReactDOM.findDOMNode(this.refs.myChart);
        var myPieChart = new Chart(ctx,{
            type: 'pie',
            data: data,

        });

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
