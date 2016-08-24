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
            reco : null,
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

    display_reco : function(){
        if(this.state.reco !== null){
            if(this.state.reco.length === 0)
                return (<span>Currently there are no recommendations available.</span>)
            else {
                return (
                    <div className="collection food-list-result">
                        {this.state.reco.map(function(food, index){
                            return (
                                <a key={index} className="collection-item  red-text text-accent-2">
                                    {food}
                                </a>
                            )
                        })}
                    </div>
                )
            }
        }
        else{
            return (
                <div className="preloader-wrapper big active ploader">
                 <div className="spinner-layer spinner-blue">
                   <div className="circle-clipper left">
                     <div className="circle"></div>
                   </div><div className="gap-patch">
                     <div className="circle"></div>
                   </div><div className="circle-clipper right">
                     <div className="circle"></div>
                   </div>
                 </div>

                 <div className="spinner-layer spinner-red">
                   <div className="circle-clipper left">
                     <div className="circle"></div>
                   </div><div className="gap-patch">
                     <div className="circle"></div>
                   </div><div className="circle-clipper right">
                     <div className="circle"></div>
                   </div>
                 </div>

                 <div className="spinner-layer spinner-yellow">
                   <div className="circle-clipper left">
                     <div className="circle"></div>
                   </div><div className="gap-patch">
                     <div className="circle"></div>
                   </div><div className="circle-clipper right">
                     <div className="circle"></div>
                   </div>
                 </div>

                 <div className="spinner-layer spinner-green">
                   <div className="circle-clipper left">
                     <div className="circle"></div>
                   </div><div className="gap-patch">
                     <div className="circle"></div>
                   </div><div className="circle-clipper right">
                     <div className="circle"></div>
                   </div>
                 </div>
               </div>
            )
        }
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
                    <div className="card-panel amber darken-2">
                        <p className="white-text">Here are some recommendations based on your calorie target and how much you eaten!</p>
                    </div>
                    {this.display_reco()}

                    <br />
                    <button className="amber white-text waves-effect waves-light btn darken-2" onClick={this.getRecommendation} name="action">Refresh!
                        <i className="fa fa-paper-plane-o" aria-hidden="true"></i>
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
