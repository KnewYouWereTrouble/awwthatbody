import React from 'react'
import ReactDOM from 'react-dom'
import {browserHistory} from 'react-router'

import {connect} from 'react-redux';
import * as actionCreators from '../../src/action_creators';

const LoginForm = React.createClass({

    componentDidMount : function(){
        this.props.clear_all_errors()
    },

    submitForm : function(event){
        event.preventDefault()
        this.props.ajaxLogin({username : ReactDOM.findDOMNode(this.refs.usernameField).value,
                              password : ReactDOM.findDOMNode(this.refs.passwordField).value })
    },

    render : function(){
        return (
            <div className="card z-depth-1">
                <div className="card-content">
                    <form onSubmit={this.submitForm}>
                        <h5 className="condensed light">Login</h5>
                        <br />
                        <span>Username</span>
                        <input className="black-text" type="text" ref="usernameField" required></input>
                        <span>Password</span>
                        <input className="black-text" type="password" ref="passwordField" required></input>

                        {this.props.login_err ?
                            <span> <br /><br />Either username or password is wrong. Please try again.</span> : ""}

                        <br /><br />

                        <button className="btn waves-effect waves-light  amber darken-2" type="submit" name="action">LOGIN
                            <i className="fa fa-paper-plane-o" aria-hidden="true"></i>
                        </button>

                        <br />

                    </form>
                </div>

                <div className="card-action">
                    Do not have an account ? &nbsp; <a href="#" className="amber-text text-darken-2" onClick={this.props.toggleLogin}>Sign Up.</a>
                </div>
            </div>
        )
    }
})

function mapStateToProps(state){
    return {
        login_err : state.get('login_err')
    }
}


export default connect(mapStateToProps, actionCreators)(LoginForm);
