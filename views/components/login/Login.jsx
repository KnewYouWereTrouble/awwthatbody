import React from 'react'
import ReactDOM from 'react-dom'

import { Link } from 'react-router'

import LoginForm from './LoginForm.jsx'
import SignupForm from './SignupForm.jsx'

export default React.createClass({

    getInitialState : function(){
        return {
            loginForm : true
        }
    },

    toggleLogin : function(event){
        event.preventDefault()
        this.setState({loginForm : !this.state.loginForm})
    },

    render : function(){
        return (
            <div className="container login-wrapper">
                <div className="row">
                    <div className="col s4 offset-s4">
                        <h3 className="condensed light">Aww That Body</h3>
                        {this.state.loginForm ? <LoginForm toggleLogin={this.toggleLogin} /> :
                        <SignupForm toggleLogin={this.toggleLogin}/> }
                    </div>
                </div>
            </div>
        )
    }
})
