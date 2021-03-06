import React from 'react'
import ReactDOM from 'react-dom'
import {browserHistory} from 'react-router'

import {connect} from 'react-redux';
import * as actionCreators from '../../src/action_creators';

import moment from 'moment'
import Chart from 'chart.js'

import chartconfig from '../../../config/chartconfig.js'
import Timekeeper from '../../src/timekeeper.js'


const DailyMacrosTargetChart = React.createClass({

    getInitialState : function(){
        return {
            mychart : null
        }
    },

    drawChart : function(props){
        if(this.state.mychart) this.state.mychart.destroy()
        var ctx = ReactDOM.findDOMNode(this.refs.myChart);
        var macros = [props.statistics.user_protein,
                      props.statistics.user_fat_total,
                      props.statistics.user_cholesterol,
                      props.statistics.user_dietary_fibre,
                      props.statistics.user_carbohydrates,
                      props.statistics.user_calcium]

        chartconfig.daily_target_chart_data_macros.datasets[0].data = macros

        var mychart = new Chart(ctx, {
            type : 'bar',
            data : chartconfig.daily_target_chart_data_macros,
            options : chartconfig.daily_target_chart_options
        });

        this.setState({mychart : mychart})
    },

    componentDidMount : function(){
        this.drawChart(this.props)
    },

    componentWillReceiveProps: function(nextProps) {
        this.drawChart(nextProps)
    },


    render : function(){
        return <canvas ref="myChart" width="150" height="120"></canvas>
    }
})



function mapStateToProps(state) {
  return {
    username: state.get('username')
  };
}

export default connect(mapStateToProps, actionCreators)(DailyMacrosTargetChart);
