import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./dashboard.css";

function TweetModal({ refresh, setRefresh }) {
	const dispatch = useDispatch();

	const { token } = useSelector((state) => state.authReducer);

	const [newTweet, setNewTweet] = useState("");

	async function handleTweet() {
		if (newTweet) {
			try {
				setNewTweet("");
				const data = {
					content: newTweet,
				};
				const response = await fetch(`${process.env.REACT_APP_API_URL}/tweet`, {
					method: "POST",
					headers: {
						Accept: "application/json",
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
					body: JSON.stringify(data),
				});
				const createdTweet = await response.json();
				dispatch({
					type: `CREATE_TWEET`,
					payload: createdTweet,
				});
				setNewTweet("");
				setRefresh(!refresh);
			} catch {
				// return alert("Algo salio mal. Verifica los datos ingresados hola");
			}
		}
	}
	return (
		<div className="modal-dialog modal-dialog-centered text-dark">
			<div
				className="modal fade"
				id="ModalTweet"
				tabIndex="-1"
				aria-labelledby="exampleModalLabel"
				aria-hidden="true"
			>
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title" id="exampleModalLabel">
								Tweet
							</h5>
							<button
								type="button"
								className="btn-close"
								data-bs-dismiss="modal"
								aria-label="Close"
							></button>
						</div>
						<div className="modal-body tweetBox">
							<form
								onSubmit={(event) => {
									handleTweet();
									event.preventDefault();
								}}
							>
								<div className="tweetbox__input">
									<img
										src="https://i.pinimg.com/originals/a6/58/32/a65832155622ac173337874f02b218fb.png"
										alt=""
									/>
									<input
										type="text"
										name="content"
										placeholder="What's happening?"
										value={newTweet}
										onChange={(e) => setNewTweet(e.target.value)}
									/>
								</div>
								<button
									type="submit"
									className="tweetBox__tweetButton"
									data-bs-dismiss="modal"
								>
									Tweet
								</button>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default TweetModal;
