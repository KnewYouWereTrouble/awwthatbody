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
                        <p className="white-text">Good Job, you are eating well!</p>
                    </div>
                    <br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    {this.props.gender === "Male" ?
                        <img className="center-align" width="40%" src="/images/healthyboy.jpg"/>
                        :
                        <img className="center-align" width="40%" src="/images/healthygirl.jpg"/>
                    }

                </div>)
        }else if(this.props.statistics.user_energy < this.props.user_daily_calorie_target){
            return(
                <div>
                    <div className="card-panel orange darken-3">
                        <p className="white-text">Good Job, but just a bit more and you overshot your daily target!</p>
                    </div>
                    <br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    {this.props.gender === "Male" ?
                        <img className="center-align" width="40%" src="/images/healthyboy.jpg"/>
                        :
                        <img className="center-align" width="40%" src="/images/healthygirl.jpg"/>
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
                        <img className="center-align" width="40%" src="/images/fatboy.jpg"/>
                        :
                        <img className="center-align" width="40%" src="/images/fatgirl.jpg"/>
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
