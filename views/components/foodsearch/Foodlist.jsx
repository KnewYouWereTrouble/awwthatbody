import React from 'react'
import ReactDOM from 'react-dom'
import {browserHistory} from 'react-router'

import {connect} from 'react-redux';
import * as actionCreators from '../../src/action_creators';


const Foodlist = React.createClass({


    render : function(){
        return (

            <div>
                <div className="collection food-list-result">
                    {this.props.foodlist.map(function(food, index){
                        return (
                            <a key={index} onClick={this.props.displayCard} className="collection-item amber-text">
                                {food["Food Name"]}
                            </a>
                        )
                    }.bind(this))}
                </div>
            </div>
        )
    }


})

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps, actionCreators)(Foodlist);
