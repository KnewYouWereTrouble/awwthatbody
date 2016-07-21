import React from 'react'
import ReactDOM from 'react-dom'
import {browserHistory} from 'react-router'

import {connect} from 'react-redux';
import * as actionCreators from '../../src/action_creators';

import WeeklyChart from '../charting/WeeklyChart.jsx'
import MonthlyChart from '../charting/MonthlyChart.jsx'
import FoodCategoryMonthlyChart from '../charting/FoodCategoryMonthlyChart.jsx'
import FoodHistory from './FoodHistory.jsx'

import axios from 'axios'


const Dashboard = React.createClass({


    render : function(){
        return (
            <div>
                <h3 className="condensed light">Statsboard</h3>
                <div className="row">
                    <div className="col s7"><WeeklyChart /></div>
                    <div className="col s5"><FoodHistory /></div>
                </div>
                <div className="row">
                    <div className="col s3"><FoodCategoryMonthlyChart /></div>
                    <div className="col s9"><MonthlyChart /></div>
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

export default connect(mapStateToProps, actionCreators)(Dashboard);
