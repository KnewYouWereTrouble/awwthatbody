import React from 'react'
import ReactDOM from 'react-dom'
import {browserHistory, Link} from 'react-router'

import {connect} from 'react-redux';
import * as actionCreators from '../../src/action_creators';

const AppLayout = React.createClass({

    getInitialState : function(){
        return {
            path : window.location.pathname
        }
    },

    onClickProfile : function(){
        this.setState({path : "/profile"})
    },

    onClickDashboard : function(){
        this.setState({path : "/dashboard"})
    },

    onClickStatsboard : function(){
        this.setState({path : "/statsboard"})
    },

    onClickFoodsearch : function(){
        this.setState({path : "/foodsearch"})
    },

    onClickExplore: function(){
        this.setState({path : "/explore"})
    },

    render : function(){
        return (
            <div>
                {this.state.path === "/profile" ?
                    <Link className="orange-text text-accent-4" to='/profile' onClick={this.onClickProfile}>
                        <h2 className="center-align"><i className="fa fa-user" aria-hidden="true"></i></h2>
                    </Link>
                    :
                    <Link className="amber-text text-accent-4" to='/profile' onClick={this.onClickProfile}>
                        <h2 className="center-align"><i className="fa fa-user" aria-hidden="true"></i></h2>
                    </Link>
                }
                {this.state.path === "/dashboard" ?
                    <Link className="orange-text text-accent-4" to='/dashboard' onClick={this.onClickDashboard}>
                        <h2 className="center-align"><i className="fa fa-bar-chart" aria-hidden="true"></i></h2>
                    </Link>
                    :
                    <Link className="amber-text text-accent-4" to='/dashboard' onClick={this.onClickDashboard}>
                        <h2 className="center-align"><i className="fa fa-bar-chart" aria-hidden="true"></i></h2>
                    </Link>
                }
                {this.state.path === "/statsboard" ?
                    <Link className="orange-text text-accent-4" to='/statsboard' onClick={this.onClickStatsboard}>
                        <h2 className="center-align"><i className="fa fa-pie-chart" aria-hidden="true"></i></h2>
                    </Link>
                    :
                    <Link className="amber-text text-accent-4" to='/statsboard' onClick={this.onClickStatsboard}>
                        <h2 className="center-align"><i className="fa fa-pie-chart" aria-hidden="true"></i></h2>
                    </Link>
                }
                {this.state.path === "/foodsearch" ?
                    <Link className="orange-text text-accent-4" to='/foodsearch' onClick={this.onClickFoodsearch}>
                        <h2 className="center-align"><i className="fa fa-cutlery" aria-hidden="true"></i></h2>
                    </Link>
                    :
                    <Link className="amber-text text-accent-4" to='/foodsearch' onClick={this.onClickFoodsearch}>
                        <h2 className="center-align"><i className="fa fa-cutlery" aria-hidden="true"></i></h2>
                    </Link>
                }
                {this.state.path === "/explore" ?
                    <Link className="orange-text text-accent-4" to='/explore' onClick={this.onClickExplore}>
                        <h2 className="center-align"><i className="fa fa-camera" aria-hidden="true"></i></h2>
                    </Link>
                    :
                    <Link className="amber-text text-accent-4" to='/explore' onClick={this.onClickExplore}>
                        <h2 className="center-align"><i className="fa fa-camera" aria-hidden="true"></i></h2>
                    </Link>
                }



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
