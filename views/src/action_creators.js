import {browserHistory} from 'react-router'
import axios from 'axios'

function login_user(response){
    return {
        type : "LOGIN USER",
        response : response.data
    }
}

function signup_user(response){
    return {
        type : "SIGNUP USER",
        response : response.data
    }
}

function update_user(response){
    return {
        type : "UPDATE USER",
        response : response.data
    }
}


function login_user_err(response){
    return {
        type : "LOGIN USER ERROR",
    }
}

function signup_user_err(response){
    return {
        type : "SIGNUP USER ERROR",
    }
}

function update_user_err(response){
    return {
        type : "UPDATE USER ERROR",
    }
}

export function clear_all_errors(){
    return {
        type : "CLEAR ALL ERRORS"
    }
}

export function ajaxLogin(logindata){
    return function(dispatch){

        axios.post("/login", {
            username : logindata.username,
            password : logindata.password
        })
        .then(response => {
            if(response.data.errmsg)
                dispatch(login_user_err(response))
            else {
                dispatch(login_user(response))
                browserHistory.replace('/dashboard')
            }
        })
        .catch(response => {
            dispatch(login_user_err(response))
        })
    }
}

export function ajaxSignup(signupdata){
    return function(dispatch){

        axios.post("/signup", {
            name : signupdata.name,
            email : signupdata.email,
            username : signupdata.username,
            password : signupdata.password,
            height : Number(signupdata.height),
            weight : Number(signupdata.weight),
            age : Number(signupdata.age),
            gender : signupdata.gender

        })
        .then(response => {
            if(response.data.errmsg){
                dispatch(signup_user_err(response))
            }
            else{
                dispatch(signup_user(response))
                browserHistory.replace('/dashboard')
            }
        })
        .catch(response => {
            dispatch(signup_user_err(response))
        })
    }
}

export function ajaxUpdateUser(updatedata){
    return function(dispatch){
        axios.post("/userdb/updateuser", {
            name : updatedata.name,
            email : updatedata.email,
            username : updatedata.username,
            weight : updatedata.weight,
            height : updatedata.height,
            daily_calorie_target : updatedata.daily_calorie_target

        })
        .then(response => {
            if(response.data.errmsg)
                dispatch(update_user_err(response))
            else{
                dispatch(update_user(response))
                window.location.replace("http://localhost:3000/dashboard")
            }
        })
        .catch(response => {
            dispatch(update_user_err(response))
        })
    }
}

export function ajaxLogout(){
    return function(dispatch){

        axios.get("/logout", {})
        .then(response => {
            window.localStorage.removeItem("JIO STORE");
            browserHistory.replace('/')
        })
        .catch(response => {
            dispatch(signup_user_err(response))
        })
    }
}
























//
