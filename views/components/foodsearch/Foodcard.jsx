import React from 'react'
import ReactDOM from 'react-dom'
import {browserHistory} from 'react-router'

import {connect} from 'react-redux';
import * as actionCreators from '../../src/action_creators';

import axios from 'axios'

const Foodcard = React.createClass({

    getInitialState : function(){
        return {
            want_to_eat : false,
        }
    },

    eat_something : function(event){
        event.preventDefault()
        this.setState({want_to_eat : true})
    },

    eat_breakfast : function(event){
        event.preventDefault()
        axios.post('/fooddb/addFood', {foodname : this.props.foodcard["Food Name"], type : "breakfast"})
            .then(response => {
                browserHistory.push('/dashboard')
            })
    },

    eat_lunch : function(event){
        event.preventDefault()
        axios.post('/fooddb/addFood', {foodname : this.props.foodcard["Food Name"], type : "lunch"})
            .then(response => {
                browserHistory.push('/dashboard')
            })
    },

    eat_dinner : function(event){
        event.preventDefault()
        axios.post('/fooddb/addFood', {foodname : this.props.foodcard["Food Name"], type : "dinner"})
            .then(response => {
                browserHistory.push('/dashboard')
            })
    },
    eat_supper : function(event){
        event.preventDefault()
        axios.post('/fooddb/addFood', {foodname : this.props.foodcard["Food Name"], type : "supper"})
            .then(response => {
                browserHistory.push('/dashboard')
            })
    },
    eat_snacks : function(event){
        event.preventDefault()
        axios.post('/fooddb/addFood', {foodname : this.props.foodcard["Food Name"], type : "snacks"})
            .then(response => {
                browserHistory.push('/dashboard')
            })
    },

    render : function(){
        return (
            <div className="card hoverable">
                <div className="card-image waves-effect waves-block waves-light">
                    <img className="activator foodcard-img" src={this.props.foodcard["imgurl"]} />
                </div>
                <div className="card-content">
                    <span className="card-title activator amber-text">{this.props.foodcard["Food Name"]}<i className="material-icons right">more_vert</i></span>
                    <p>Serving Portion: {this.props.foodcard["Serving Portion"]}</p>
                    <p>Calories (kcal): {this.props.foodcard["Energy (kcal)"]}</p>
                    <p>Protein (g): {this.props.foodcard["Protein (g)"]}</p>
                </div>
                <div className="card-reveal">
                    <span className="card-title amber-text">{this.props.foodcard["Food Name"]}<i className="material-icons right">close</i></span>
                    <p>Calories (kcal): {this.props.foodcard["Energy (kcal)"]}</p>
                    <p>Protein (g): {this.props.foodcard["Protein (g)"]}</p>
                    <p>Fat Total (g): {this.props.foodcard["Fat Total (g)"]}</p>
                    <p>Cholesterol (mg): {this.props.foodcard["Cholesterol (mg)"]}</p>
                    <p>Dietary Fibre (g): {this.props.foodcard["Dietary Fibre (g)"]}</p>
                    <p>Carbohydrates (g): {this.props.foodcard["Carbohydrates (g)"]}</p>
                    <p>Calcium (mg): {this.props.foodcard["Calcium (mg)"]}</p>
                    <p>Sodium (mg): {this.props.foodcard["Sodium (mg)"]}</p>
                </div>

                <div className="card-action">
                    <a className="amber white-text waves-effect waves-light btn" onClick={this.eat_something} href="#">I'm eating this</a>
                    {this.state.want_to_eat ?
                    <div>
                        <a onClick={this.eat_breakfast} className="red white-text waves-effect waves-light btn" href="#">Breakfast</a>
                        <a onClick={this.eat_lunch} className="pink white-text waves-effect waves-light btn" href="#">Lunch</a>
                        <a onClick={this.eat_dinner} className="cyan white-text waves-effect waves-light btn" href="#">Dinner</a>
                        <a onClick={this.eat_supper} className="blue white-text waves-effect waves-light btn" href="#">Supper</a>
                        <a onClick={this.eat_snacks} className="indigo white-text waves-effect waves-light btn" href="#">Snacks</a>
                    </div>
                        :
                    ""
                    }
                </div>
            </div>

        )
    }


})

function mapStateToProps(state) {
  return {
    username: state.get('username')
  };
}

export default connect(mapStateToProps, actionCreators)(Foodcard);
