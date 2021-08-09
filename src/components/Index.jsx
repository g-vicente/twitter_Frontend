import React from 'react'

function Index() {
    return (
        <div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-6 d-none d-sm-block left">
                        <div className="rows-3">
                        <h4> <i className="fas fa-search"></i> Follow your interests</h4><br /><br />
                        <h4> <i className="fas fa-user-secret"></i> Hear what people are talking about</h4><br /><br />
                        <h4> <i className="fas fa-dove"></i> Join the conversation</h4><br />
                        </div>
                    </div>

                    <div className="col-sm-6 col-12 right">
                        <div id="welcome">
                            <div className="logo-segment">
                                <div id="logo"><i className="fab fa-twitter fa-2x"></i></div>
                                <div id="sideLogin">
                                <a href="login"><button>Log in</button></a>
                                </div>
                            </div>
                            <h2>See What's happening in the world right now</h2>
                            <br /><br /><br />
                            <h4> Join twitter today</h4>
                            <div id="signUp">
                                <a href="signUp"><button> Sign up</button></a>
                            </div> <br />
                            <div id="signIn">
                                <a href="login"><button> Log in</button></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>  
    )
}

export default Index
