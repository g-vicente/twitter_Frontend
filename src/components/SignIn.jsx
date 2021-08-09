import React from 'react'
import { Link } from "react-router-dom";

function SignIn() {
    return (
        <div>
            <div className="ruban">
                <div className="inner-content">
                    <div className="logo">
                    <Link to={`/signup`}>
                        <i className="fab fa-twitter"></i>
                        Register
                    </Link>
                    </div>
                    <div>About</div>
                </div>
            </div>

                <div id="sign-up">
                <h2>Log in to Twitter</h2>
                <form action="/login" method="POST">
                    <div className="form-group">
                    <label for="username">Login</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="username or email"
                        id="username"
                        name="username"
                        required
                    />
                    </div>

                    <div className="form-group">
                    <label for="password">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        required
                    />
                    </div>

                    <button type="submit" className="btn btn-primary">Log in</button>
                </form>
                </div>
        </div>
    )
}

export default SignIn
