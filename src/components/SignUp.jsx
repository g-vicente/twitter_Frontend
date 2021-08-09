import React from 'react'

function SignUp() {
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
					<a href="/login">
						<i className="fab fa-twitter"></i>
						Log In
					</a>
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
			<form action="/userCreate" method="POST">
				<div className="form-group">
					<label for="firstname">First Name</label>
					<input
						type="text"
						className="form-control"
						name="firstname"
						id="firstname"
						placeholder="First name"
						required
					/>
				</div>
				<div className="form-group">
					<label for="lastname">Last Name</label>
					<input
						type="text"
						className="form-control"
						id="lastname"
						name="lastname"
						placeholder="Last name"
						required
					/>
				</div>
				<div className="form-group">
					<label for="username">Username</label>
					<input
						type="text"
						className="form-control"
						id="username"
						name="username"
						placeholder="Twitter username"
						required
					/>
				</div>
				<div className="form-group">
					<label for="email">Email address</label>
					<input
						type="email"
						className="form-control"
						id="email"
						name="email"
						placeholder="email address"
						aria-describedby="emailHelp"
					/>
					<small id="emailHelp" className="form-text text-muted"
						>We'll never share your email with anyone else.
                        </small>
				</div>
				<div className="form-group">
					<label for="password">Password</label>
					<input
						type="password"
						className="form-control"
						id="password"
						name="password"
						id="exampleInputPassword1"
						required
					/>
				</div>
				<div className="checkbox">
					<label
						><input type="checkbox" name="newUserSeeder" value="1" />Desea que
						agreguemos usuarios a su lista de Following?
                        </label>
				</div>

				<button type="submit" className="btn btn-primary">Submit</button>
			</form>
		</div>
        </div>
    )
}

export default SignUp
