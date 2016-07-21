import React from 'react'
import ReactDOM from 'react-dom'
import {browserHistory} from 'react-router'

import {connect} from 'react-redux';
import * as actionCreators from '../../src/action_creators';

import axios from 'axios'


const DailyFoodIntake = React.createClass({

    render : function(){
        return (
            <div>
                <ul className="collection">
                    {this.props.user_food_list.map(function(food, index){
                        return (
                            <li className="collection-item" key={index}>
                                {food}
                                <a href="#" onClick={this.props.remove_food} className="secondary-content pink-text text-lighten-1">
                                    <i className="material-icons">close</i>
                                </a>
                            </li>
                        )
                    }.bind(this))}
                </ul>
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
