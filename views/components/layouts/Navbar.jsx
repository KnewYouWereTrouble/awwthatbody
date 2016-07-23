import React from 'react'
import ReactDOM from 'react-dom'
import {Link, browserHistory} from 'react-router'


import {connect} from 'react-redux';
import * as actionCreators from '../../src/action_creators';


const Navbar = React.createClass({

    getInitialState : function(){
        var dpIdx = Math.floor(Math.random() * (8 - 0)) + 0;
        return {
            dpIdx : dpIdx
        }
    },

    getImgSrc : function(){
        switch(this.state.dpIdx){
            case 0 : return "./images/dp0.jpg"
            case 1 : return "./images/dp1.jpg"
            case 2 : return "./images/dp2.jpg"
            case 3 : return "./images/dp3.jpg"
            case 4 : return "./images/dp4.jpg"
            case 5 : return "./images/dp5.jpg"
            case 6 : return "./images/dp6.jpg"
            case 7 : return "./images/dp7.jpg"
        }
    },

    render : function(){
        return (
            <div className="navbar-fixed navbar-style">
                <div className="row no-bot-margin">
                    <img className="navbar-style-pic" src={this.getImgSrc()} width="100%"></img>
                    <div className="col s3 navbar-user-info white-text condensed light">
                        <br /><br />
                        <div className="row">
                            <div className="col s6">
                                <img className="circle" height="50" src={this.props.profile_pic}/>
                            </div>
                            <div className="col s6">
                                <br /><br />
                                <h3>Welcome&nbsp;</h3>
                                <h4 className="condensed light">{this.props.username}</h4>
                            </div>
                        </div>
                        <span>Keep Up the good work! Please come back again! </span>
                        <a onClick={this.logout} href="/logout">Logout ?</a>
                    </div>


                    <div className="col s5"></div>
                    <div className="col s4"></div>
                </div>
            </div>
        )
    }


})

function mapStateToProps(state) {
  return {
    username: state.get('username'),
    profile_pic : state.get('profile_pic')
  };
}

export default connect(mapStateToProps, actionCreators)(Navbar);
