import React from 'react'
import ReactDOM from 'react-dom'
import {browserHistory} from 'react-router'

import {connect} from 'react-redux';
import * as actionCreators from '../../src/action_creators';

import axios from 'axios'



const Dashboard = React.createClass({

    getInitialState : function(){
        return {}
    },

    componentWillMount : function(){
    },



    render : function(){
        return (

            <div>
                Explore
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
