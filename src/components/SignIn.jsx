import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import './signup.css'

function SignIn() {
	const [userName, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const dispatch = useDispatch();
	const history = useHistory();

	async function handleLogIn() {
		if (userName && password) {
			try {
				const creds = {
					username: userName,
					password: password,
				};

				const response = await fetch("http://localhost:3001/login", {
					method: "POST",
					headers: {
						Accept: "application/json",
						"Content-Type": "application/json",
					},
					body: JSON.stringify(creds),
				});
				const user = await response.json();
				dispatch({
					type: "LOGIN_REQUEST",
					payload: user.token,
				});
				dispatch({
					type: "SET_LOGGED_USER",
					payload: user,
				});
				history.push("/");
				// setPassword("");
			} catch {
				return alert("Algo salio mal. Verifica los datos ingresados");
			}
		}
	}

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
				<form
					onSubmit={(event) => {
						handleLogIn();
						event.preventDefault();
					}}
				>
					<div className="form-group">
						<label for="username">Login</label>
						<input
							type="text"
							className="form-control"
							placeholder="username or email"
							id="username"
							name="username"
							required
							onChange={(e) => setUsername(e.target.value)}
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
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>

					<button type="submit" className="btn btn-primary">
						Log in
					</button>
				</form>
			</div>
		</div>
	);
}

export default SignIn;
