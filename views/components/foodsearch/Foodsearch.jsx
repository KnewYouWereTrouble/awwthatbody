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

    render : function(){
        return (
            <div className="row">
                <h3 className="condensed light">Food Search</h3>

                <div className="col s4">
                    <form onSubmit={this.submitForm}>
                        <input ref="foodnameField" type="text" placeholder='Enter food name'/>
                    </form>
                    <Foodlist displayCard={this.displayCard} foodlist={this.state.foodlist}/>
                </div>

                <div className="col s5">
                    {this.state.foodcard !== "" ? <Foodcard foodcard={this.state.foodcard} /> : <span>&nbsp;</span>}
                </div>



                <div className="col s3">
                    <p>Food Recommendations</p>
                    <p>UberEats,</p>
                    <p>Food Panda,</p>
                    <p>DeliveryRoo,</p>
                    <p>Indicate food preference, low sugar, salt?</p>
                </div>


            </div>

        )
    }


})

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps, actionCreators)(Foodsearch);
