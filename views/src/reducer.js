import {Map, fromJS} from 'immutable'
import {browserHistory} from 'react-router'

function login_user(state, response){
    const temp = state.remove('login_err')
    return temp.set('username', response.username)
}

function login_user_err(state){
    return state.set('login_err', true)
}

function signup_user(state, response){
    const temp = state.remove('signup_err')
    return temp.set('username', response.username)
}

function signup_user_err(state){
    return state.set('signup_err', true)
}

function update_user(state, response){
    const temp = state.remove('updateuser_err')
    return temp.set('username', response.username)
}

function update_user_err(state){
    return state.set('updateuser_err', true)
}

function clear_all_err(state){
    var temp = state.remove('updateuser_err')
    temp = temp.remove('signup_err')
    temp = temp.remove('login_err')
    return temp
}

export default function(state = Map(), action){
    switch(action.type){
        case 'LOGIN USER' :
            return login_user(state, action.response)
        case 'SIGNUP USER' :
            return signup_user(state, action.response)
        case 'UPDATE USER' :
            return update_user(state, action.response)


        case 'LOGIN USER ERROR' :
            return login_user_err(state)
        case 'SIGNUP USER ERROR' :
            return signup_user_err(state)
        case 'UPDATE USER ERROR' :
            return update_user_err(state)
        case 'CLEAR ALL ERRORS' :
            return clear_all_err(state)
    }
    return state
}
