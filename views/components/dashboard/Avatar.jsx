import React from 'react'
import ReactDOM from 'react-dom'
import {browserHistory} from 'react-router'

import {connect} from 'react-redux';
import * as actionCreators from '../../src/action_creators';

import axios from 'axios'


const Avatar = React.createClass({

    whichToShow : function(){
        if(this.props.statistics.user_energy < this.props.user_daily_calorie_target * 5 / 10){
            return(
                <div>
                    <div className="card-panel purple accent-1">
                        <p className="white-text">Good Job, but you need to eat more!</p>
                    </div>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    {this.props.gender === "Male" ?
                        <img className="center-align avatar-pic" src="/images/skinnyboy.gif"/>
                        :
                        <img className="center-align avatar-pic" src="/images/skinnygirl.gif"/>
                    }

                </div>)
        }else if(this.props.statistics.user_energy < this.props.user_daily_calorie_target * 8 / 10){
            return(
                <div>
                    <div className="card-panel light-green accent-4">
                        <p className="white-text">Good Job, you are eating right!</p>
                    </div>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    {this.props.gender === "Male" ?
                        <img className="center-align avatar-pic" src="/images/muscularboy.gif"/>
                        :
                        <img className="center-align avatar-pic" src="/images/musculargirl.gif"/>
                    }
                </div>)
        }else if(this.props.statistics.user_energy < this.props.user_daily_calorie_target){
            return(
                <div>
                    <div className="card-panel amber darken-2">
                        <p className="white-text">Good Job, but start to watch what you are eating alright?</p>
                    </div>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    {this.props.gender === "Male" ?
                        <img className="center-align avatar-pic" src="/images/healthyboy.gif"/>
                        :
                        <img className="center-align avatar-pic" src="/images/healthygirl.gif"/>
                    }
                </div>)
        }else{
            return(
                <div>
                    <div className="card-panel red darken-3">
                        <p className="white-text">Hey hey, you are eating abit too much today!</p>
                    </div>
                    {this.props.gender === "Male" ?
                        <div>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <img className="center-align avatar-pic" src="/images/fatboy.gif"/>
                        </div>
                        :
                        <div>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <img className="center-align avatar-pic-fatgirl" src="/images/fatgirl.gif"/>
                        </div>

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
                <div className="divider"></div>
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
