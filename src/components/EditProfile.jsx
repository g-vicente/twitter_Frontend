import React from "react";

function EditProfile() {
	return (
		<div>
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
				<form
					action="/userUpdate/<%=loggedUser.id%>"
					method="POST"
					enctype="multipart/form-data"
				>
					<label for="photo">Profile Picture</label>
					<div className="row">
						<div className="col-2"></div>
						<div className="col-10">
							<div className="form-group">
								<div className="custom-file">
									<input
										type="file"
										className="custom-file-input"
										name="photo"
										id="photo"
									/>
									<label className="custom-file-label" for="photo">
										Choose file
									</label>
								</div>
							</div>
						</div>
					</div>
					<div className="form-group">
						<label for="backgroundPhoto">Background Picture</label>
						<div className="form-group">
							<div className="custom-file">
								<input
									type="file"
									className="custom-file-input"
									name="backgroundPhoto"
								/>
								<label
									className="custom-file-label"
									for="backgroundPhoto"
								>
									Choose file
								</label>
							</div>
						</div>
					</div>
					<div className="form-group">
						<label for="firstname">First Name</label>
						<input
							type="text"
							className="form-control"
							name="firstname"
							id="firstname"
							value="<%= user.firstname %>"
						/>
					</div>
					<div className="form-group">
						<label for="lastname">Last Name</label>
						<input
							type="text"
							className="form-control"
							id="lastname"
							name="lastname"
							value="<%= user.lastname %>"
						/>
					</div>
					<div className="form-group"></div>
					<div className="form-group">
						<label for="description">Description</label>
						<textarea
							type="text"
							className="form-control"
							id="description"
							name="description"
							placeholder="Description"
							cols="30"
							rows="10"
						></textarea>
					</div>

					<button type="submit" className="btn btn-primary">
						Save
					</button>
				</form>
			</div>
		</div>
	);
}

export default EditProfile;
