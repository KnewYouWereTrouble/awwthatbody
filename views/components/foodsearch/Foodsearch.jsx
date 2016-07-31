import React from 'react'
import ReactDOM from 'react-dom'
import {browserHistory} from 'react-router'

import {connect} from 'react-redux';
import * as actionCreators from '../../src/action_creators';

import axios from 'axios'

import Foodlist from './Foodlist.jsx'
import Foodcard from './Foodcard.jsx'

const Foodsearch = React.createClass({

    getInitialState : function(){
        return {
            foodlist : [],
            foodcard : "",
            reco : []
        }
    },

    submitForm : function(event){
        event.preventDefault()
        if(this.refs.foodnameField.value != ""){
            axios.post('/fooddb/findAllfood', {foodname : this.refs.foodnameField.value})
                .then(response => {
                    this.setState({foodlist : response.data})
                })
        }else{
            this.setState({foodlist : [], foodcard : ""})
        }

    },

    displayCard : function(event){
        axios.post('/fooddb/findOnefood', {foodname : event.target.text})
            .then(response => {
                this.setState({foodcard : response.data})
            })
    },

    getRecommendation : function(){
        axios.post("userdb/getrecommendation")
            .then(response => {
                var reco = []
                for(var i=0; i < response.data.length; i++){
                    reco.push(response.data[i]["Food Name"])
                }
                this.setState({reco : reco})
            })
    },

    componentWillMount : function(){
        this.getRecommendation()
    },

    render : function(){
        return (
            <div className="row">


                <div className="col s4">
                    <h3 className="condensed light">Food Search</h3>
                    <form onSubmit={this.submitForm}>
                        <input ref="foodnameField" type="text" placeholder='Enter food name'/>
                    </form>
                    <Foodlist displayCard={this.displayCard} foodlist={this.state.foodlist}/>
                </div>

                <div className="col s5">
                    {this.state.foodcard !== "" ? <Foodcard getRecommendation={this.getRecommendation}
                        foodcard={this.state.foodcard} /> : <span>&nbsp;</span>}
                </div>



                <div className="col s3">
                    <h3 className="condensed light">Feeling Lost ?</h3>
                    <span>Here are some recommendations</span>
                    <div className="collection food-list-result">
                        {this.state.reco.map(function(food, index){
                            return (
                                <a key={index} className="collection-item  red-text text-accent-2">
                                    {food}
                                </a>
                            )
                        })}
                    </div>

                    <button className="amber white-text waves-effect waves-light btn" onClick={this.getRecommendation} name="action">Refresh!
                        <i className="material-icons right">send</i>
                    </button>
                </div>


            </div>

        )
    }


})

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps, actionCreators)(Foodsearch);
