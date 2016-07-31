import React from 'react'
import ReactDOM from 'react-dom'

import {Link} from 'react-router'

export default React.createClass({


    render : function(){
        return (
            <div className="grey lighten-5">
                <div className="section no-pad-bot" id="index-banner">
                    <div className="landing-header">
                        <br /><br /><br /><br /><br /><br />
                        <br /><br /><br /><br /><br /><br />
                        <br /><br /><br /><br /><br /><br />
                        <div className="row center">
                            <h5 className="grey-text darken-3 condensed light">You wish you had it, don't you?</h5>
                        </div>
                        <div className="row center">
                            <Link id="download-button" className="btn-large waves-effect waves-light amber darken-2" to="/login">Get Started</Link>
                        </div>
                        <br /><br /><br /><br /><br /><br />
                        <br /><br /><br /><br /><br /><br />


                    </div>
                </div>


                <footer className="page-footer amber darken-2">
                    <div className="container">
                        <div className="row">
                            <div className="col l6 s12">
                                <h5 className="white-text">The Double Trouble</h5>
                                <p className="grey-text text-lighten-4">
                                    We are a team of students from NUS School of Computing.
                                    This project is part of our efforst for Orbital'16.
                                    Any feedback or suggestions are warmly welcomed and appreciated.
                                </p>
                            </div>

                            <div className="col l3 s12">
                                <h5 className="white-text">Desmond</h5>
                                <ul>
                                    <li><a className="white-text" href="#!">Facebook</a></li>
                                    <li><a className="white-text" href="#!">Twitter</a></li>
                                    <li><a className="white-text" href="#!">Instagram</a></li>
                                    <li><a className="white-text" href="#!">Google+</a></li>
                                </ul>
                            </div>

                            <div className="col l3 s12">
                                <h5 className="white-text">Damin</h5>
                                <ul>
                                    <li><a className="white-text" href="#!">Facebook</a></li>
                                    <li><a className="white-text" href="#!">Twitter</a></li>
                                    <li><a className="white-text" href="#!">Instagram</a></li>
                                    <li><a className="white-text" href="#!">Google+</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="footer-copyright">
                        <div className="container">
                            Made by <a className="orange-text text-lighten-3" href="http://materializecss.com">Materialize</a>
                        </div>
                    </div>
                </footer>
            </div>

        )
    }
})
