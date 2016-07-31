import React from 'react'
import ReactDOM from 'react-dom'
import {browserHistory} from 'react-router'

import {connect} from 'react-redux';
import * as actionCreators from '../../src/action_creators';

import Navbar from './Navbar.jsx'
import Sidebar from './Sidebar.jsx'

const AppLayout = React.createClass({

    render : function(){
        return (
            <div>
                <Navbar />
                <div className="row no-bot-margin">
                    <div className="col s1 no-left-padding sidebar z-depth-2"> <Sidebar /> </div>
                    <div className="col s11 "> {this.props.children} </div>
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

export default connect(mapStateToProps, actionCreators)(AppLayout);
