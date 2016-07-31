import React from 'react'
import ReactDOM from 'react-dom'
import {browserHistory} from 'react-router'

import {connect} from 'react-redux';
import * as actionCreators from '../../src/action_creators';

import axios from 'axios'


const Avatar = React.createClass({

    whichToShow : function(){
        if(this.props.statistics.user_energy < this.props.user_daily_calorie_target * 7 / 10){
            return(
                <div>
                    <div className="card-panel teal">
                        <p className="white-text">Good Job, but you need to eat more!</p>
                    </div>
                    <br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    {this.props.gender === "Male" ?
                        <img className="center-align avatar-pic" src="/images/skinnyboy.png"/>
                        :
                        <img className="center-align avatar-pic" src="/images/skinnygirl.png"/>
                    }

                </div>)
        }else if(this.props.statistics.user_energy < this.props.user_daily_calorie_target){
            return(
                <div>
                    <div className="card-panel orange darken-3">
                        <p className="white-text">Good Job, you are eating well!</p>
                    </div>
                    <br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    {this.props.gender === "Male" ?
                        <img className="center-align avatar-pic" src="/images/healthyboy.png"/>
                        :
                        <img className="center-align avatar-pic" src="/images/healthygirl.png"/>
                    }
                </div>)
        }else{
            return(
                <div>
                    <div className="card-panel red darken-3">
                        <p className="white-text">Oh no, you are not eating well! You overshot your daily calorie target!</p>
                    </div>
                    <br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    {this.props.gender === "Male" ?
                        <img className="center-align avatar-pic" src="/images/fatboy.png"/>
                        :
                        <img className="center-align avatar-pic" src="/images/fatgirl.png"/>
                    }
                </div>
            )
        }
    },

    render : function(){
        return (
            <div>
                <br /><br />
                {this.whichToShow()}
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
