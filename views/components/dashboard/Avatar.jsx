import React from 'react'
import ReactDOM from 'react-dom'
import {browserHistory} from 'react-router'

import {connect} from 'react-redux';
import * as actionCreators from '../../src/action_creators';

import axios from 'axios'


const Avatar = React.createClass({

    render : function(){
        return (
            <div>
                &nbsp;
                {this.props.statistics.user_energy < this.props.user_daily_calorie_target ?
                    <div>
                        <div className="card-panel teal">
                            <p className="white-text">Good Job, you are eating well!</p>
                        </div>
                        <br />
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <img className="center-align" width="40%" src="/images/fatboy.png"/>
                    </div>
                    :
                    <div>
                        <div className="card-panel red darken-3">
                            <p className="white-text">Oh no, you are not eating well! You overshot your daily calorie target!</p>
                        </div>
                        <br />
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <img className="center-align" width="40%" src="/images/fatboy1.png"/>
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

export default connect(mapStateToProps, actionCreators)(Avatar);
