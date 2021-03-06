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
                                    Some pictures used for this project does not belong to us, as such
                                    the credit goes to the original owner.
                                </p>
                            </div>

                            <div className="col l3 s12">
                                <h5 className="white-text">Desmond</h5>
                                    <h4 className="landing-social-contact"><a className="white-text" href="https://www.facebook.com/detchmund"><i className="fa fa-facebook-official" aria-hidden="true"></i></a></h4>
                                    <h4 className="landing-social-contact"><a className="white-text" href="https://www.instagram.com/desmondnation/"><i className="fa fa-instagram" aria-hidden="true"></i></a></h4>
                            </div>

                            <div className="col l3 s12">
                                <h5 className="white-text">Damin</h5>
                                <h4 className="landing-social-contact"><a className="white-text" href="https://www.facebook.com/profile.php?id=699246220"><i className="fa fa-facebook-official" aria-hidden="true"></i></a></h4>
                                <h4 className="landing-social-contact"><a className="white-text" href="https://www.facebook.com/l.php?u=https%3A%2F%2Fwww.instagram.com%2Fbrotherdamin%2F&h=IAQG0mE7d"><i className="fa fa-instagram" aria-hidden="true"></i></a></h4>
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
