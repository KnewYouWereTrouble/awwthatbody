import React from 'react'
import ReactDOM from 'react-dom'


import {connect} from 'react-redux';
import * as actionCreators from '../../src/action_creators';

const SignupForm = React.createClass({

    getInitialState : function(){
        return {
            invalid_password : false,
        }
    },

    componentDidMount : function(){
        this.props.clear_all_errors()
    },

    submitForm : function(event){
        event.preventDefault()
        if(ReactDOM.findDOMNode(this.refs.passwordField).value.length < 8){
            this.setState({invalid_password : true})
        }
        else {
            this.props.ajaxSignup({name : ReactDOM.findDOMNode(this.refs.nameField).value,
                                  username : ReactDOM.findDOMNode(this.refs.usernameField).value,
                                  password : ReactDOM.findDOMNode(this.refs.passwordField).value,
                                  email : ReactDOM.findDOMNode(this.refs.emailField).value,
                                  age : ReactDOM.findDOMNode(this.refs.ageField).value,
                                  height : ReactDOM.findDOMNode(this.refs.heightField).value,
                                  weight : ReactDOM.findDOMNode(this.refs.weightField).value,
                                  gender : this.refs.form.gender.value
                            })
        }

    },

    render : function(){
        return (
            <div className="card blue-grey hoverable">
                <div className="card-content white-text">
                    <form ref="form" onSubmit={this.submitForm}>
                        <p>This a the signup form</p>
                        <input type="text" placeholder="NAME" ref="nameField" required></input>
                        <input type="email" placeholder="EMAIL" ref="emailField" required></input>
                        <input type="text" placeholder="USERNAME" ref="usernameField" required></input>
                        <input type="password" placeholder="PASSWORD" ref="passwordField" required></input>

                        <input type="text" placeholder="AGE" ref="ageField" pattern="[0-9]{1,3}" required></input>
                        <input type="text" placeholder="WEIGHT (kg)" ref="weightField" pattern="[0-9]{1,3}" required></input>
                        <input type="text" placeholder="HEIGHT (cm)" ref="heightField" pattern="[0-9]{1,3}" required></input>

                        <input name="gender" type="radio" id="Male" value="Male" required/>
                        <label htmlFor="Male">Male</label>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <input name="gender" type="radio" id="Female" value="Female"/>
                        <label htmlFor="Female">Female</label>

                        {this.state.invalid_password ? <span><br /><br />Password must be at least 8 characters.</span> : ""}
                        {this.props.signup_err ? <span><br /><br />Either Username or Email has been taken. Please try another one.</span> : ""}
                        <br /><br />
                        <button className="btn waves-effect waves-light" type="submit" name="action">SIGN UP
                            <i className="material-icons right">send</i>
                        </button> <br />
                    </form>
                </div>
                <div className="card-action">
                    Already have an account ? <a href="#" onClick={this.props.toggleLogin}>Log in.</a>
                </div>
            </div>

        )
    }
})


function mapStateToProps(state){
    return {
        signup_err : state.get('signup_err')
    }
}

export default connect(mapStateToProps, actionCreators)(SignupForm);
