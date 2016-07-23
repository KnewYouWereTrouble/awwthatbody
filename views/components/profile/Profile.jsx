import React from 'react'
import ReactDOM from 'react-dom'
import {browserHistory} from 'react-router'

import {connect} from 'react-redux';
import * as actionCreators from '../../src/action_creators';

import axios from 'axios'

const Profile = React.createClass({

    getInitialState : function(){
        return {
            user_username : "",
            user_name : "",
            user_email : "",
            user_weight : "",
            user_height : "",
            user_calories_target : ""
        }
    },

    //This is for page refresh
    componentWillReceiveProps: function(nextProps) {
        this.props.clear_all_errors()
        this.props.ajaxUpdateProfilePic()
        axios.post('/userdb/getuser', {username: nextProps.username,})
            .then(response => {
                this.setState({user_email : response.data.email,
                               user_name : response.data.name,
                               user_username : response.data.username,
                               user_weight : response.data.weight,
                               user_height : response.data.height,
                               user_calories_target : response.data.daily_calorie_target})
            })

    },

    //This is for initial access
    componentDidMount : function(){
        this.props.clear_all_errors()
        if(this.state.user_username === "" && this.props.username){
            axios.post('/userdb/getuser', {username: this.props.username,})
                .then(response => {
                    this.setState({user_email : response.data.email,
                                   user_name : response.data.name,
                                   user_username : response.data.username,
                                   user_weight : response.data.weight,
                                   user_height : response.data.height,
                                   user_calories_target : response.data.daily_calorie_target})
                })
        }
    },


    handleUsernameChange: function(event) {
        this.setState({user_username: event.target.value});
    },

    handleNameChange: function(event) {
        this.setState({user_name: event.target.value});
    },

    handleEmailChange: function(event) {
        this.setState({user_email: event.target.value});
    },

    handleWeightChange: function(event) {
        this.setState({user_weight: event.target.value});
    },

    handleHeightChange: function(event) {
        this.setState({user_height: event.target.value});
    },

    handleCaloriesChange: function(event) {
        this.setState({user_calories_target: event.target.value});
    },

    submitForm : function(event){
        event.preventDefault()
        this.props.ajaxUpdateUser({email : this.state.user_email,
                                   name : this.state.user_name,
                                   username : this.state.user_username,
                                   weight : Number(this.state.user_weight),
                                   height : Number(this.state.user_height),
                                   daily_calorie_target : Number(this.state.user_calories_target)})
    },

    render : function(){
        return (
            <div>
                <h4>Edit Profile</h4>
                <div className="row">
                    <div className="col s3 offset-s1">
                        <form encType="multipart/form-data" method="post" action="/userdb/changeprofilepic">
                            <br /> <br />
                            <img className="circle responsive-img" src={this.props.profile_pic}/>
                            <input type="file" name="upl" required/>
                            <br /> <br />
                            <button className="btn waves-effect waves-light amber darken-2" type="submit" name="action">Change Profile Picture
                                &nbsp;&nbsp; <i className="fa fa-camera" aria-hidden="true"></i>
                            </button> <br />
                        </form>

                    </div>

                    <div className="col s4 offset-s1">
                        <form className="col s12" onSubmit={this.submitForm}>

                            <span className="condensed light grey-text">Name :</span>
                            <input type="text" id="name" value={this.state.user_name} required
                                onChange={this.handleNameChange} placeholder="Name"></input>

                            <span className="condensed light grey-text">Username :</span>
                            <input type="text" id="username" value={this.state.user_username} required
                                onChange={this.handleUsernameChange} placeholder="Username"></input>

                            <span className="condensed light grey-text">Email :</span>
                            <input type="email" id="email" value={this.state.user_email} required
                                onChange={this.handleEmailChange} placeholder="Email"></input>

                            <span className="condensed light grey-text">Weight(kg) :</span>
                            <input type="text" id="weight" value={this.state.user_weight} pattern="[0-9]{1,3}" required
                                onChange={this.handleWeightChange} placeholder="Weight"></input>

                            <span className="condensed light grey-text">Height(cm) :</span>
                            <input type="text" id="height" value={this.state.user_height} pattern="[0-9]{1,3}" required
                                onChange={this.handleHeightChange} placeholder="Height"></input>

                            <span className="condensed light grey-text">Daily Calories Target :</span>
                            <input type="text" id="target" value={this.state.user_calories_target} pattern="[0-9]{1,5}" required
                                onChange={this.handleCaloriesChange} placeholder="Calories (kcal)"></input>

                            <button className="btn waves-effect waves-light amber darken-2" type="submit" name="action">UPDATE
                                <i className="material-icons right">send</i>
                            </button> <br />

                        </form>
                    </div>

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

export default connect(mapStateToProps, actionCreators)(Profile);
