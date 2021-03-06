import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import "./signup.css";

function SignUp() {
	const dispatch = useDispatch();
	const history = useHistory();

	const [userName, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [firstname, setFirstname] = useState("");
	const [lastname, setLastname] = useState("");
	const [email, setEmail] = useState("");
	const [newUserSeeder, setNewUserSeeder] = useState("");

	async function handleSignUp() {
		if (userName && password) {
			try {
				const creds = {
					username: userName,
					password: password,
					firstname: firstname,
					lastname: lastname,
					email: email,
					newUserSeeder: newUserSeeder,
				};

				const response = await fetch(`${process.env.REACT_APP_API_URL}/user`, {
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
				if (user) {
					history.push("/");
				}
			} catch {
				return alert("Algo salio mal. Verifica los datos ingresados");
			}
		}
	}

	return (
		<div>
			{/* <% if(registroFail){ %>
		<div className="alert alert-danger" role="alert">
			No se pudo crear la cuenta. El usuario o el email ya estan en uso. Pruebe con
			otro
		</div>
		<div className="text-center">
			<a href="/signup" className="btn btn-danger my-3">Try again</a>
		</div>
		<% }%> */}
			<div className="ruban">
				<div className="inner-content">
					<div className="logo">
						<Link to={`/signin`}>
							<i className="fab fa-twitter"></i>
							Log In
						</Link>
					</div>
					<div>About</div>
				</div>
			</div>

			<div id="sign-up">
				<div className="logo">
					<a href="index.html">
						<i className="fab fa-twitter fa-2x"></i>
					</a>
				</div>
				<form
					onSubmit={(event) => {
						handleSignUp();
						event.preventDefault();
					}}
				>
					<div className="form-group">
						<label htmlFor="firstname">First Name</label>
						<input
							type="text"
							className="form-control text-dark"
							name="firstname"
							id="firstname"
							placeholder="First name"
							required
							onChange={(e) => setFirstname(e.target.value)}
						/>
					</div>
					<div className="form-group">
						<label htmlFor="lastname">Last Name</label>
						<input
							type="text"
							className="form-control text-dark"
							id="lastname"
							name="lastname"
							placeholder="Last name"
							required
							onChange={(e) => setLastname(e.target.value)}
						/>
					</div>
					<div className="form-group">
						<label htmlFor="username">Username</label>
						<input
							type="text"
							className="form-control text-dark"
							id="username"
							name="username"
							placeholder="Twitter username"
							required
							onChange={(e) => setUsername(e.target.value)}
						/>
					</div>
					<div className="form-group">
						<label htmlFor="email">Email address</label>
						<input
							type="email"
							className="form-control text-dark"
							id="email"
							name="email"
							placeholder="email address"
							aria-describedby="emailHelp"
							onChange={(e) => setEmail(e.target.value)}
						/>
						<small id="emailHelp" className="form-text text-muted">
							We'll never share your email with anyone else.
						</small>
					</div>
					<div className="form-group">
						<label htmlFor="password">Password</label>
						<input
							type="password"
							className="form-control text-dark"
							id="password"
							name="password"
							id="exampleInputPassword1"
							required
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
					<div className="checkbox">
						<label>
							<input
								type="checkbox"
								name="newUserSeeder"
								value="1"
								onChange={(e) => setNewUserSeeder(e.target.value)}
							/>
							Desea que agreguemos usuarios a su lista de Following?
						</label>
					</div>

					<button type="submit" className="btn btn-primary">
						Submit
					</button>
				</form>
			</div>
		</div>
	);
}

export default SignUp;
