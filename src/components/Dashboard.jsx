import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./dashboard.css";
import LeftPanel from "./LeftPanel";
import RightPanel from "./RightPanel";
import Tweet from "./Tweet";

function Dashboard() {
	const {loggedUser} = useSelector((state) => state.tweetReducer);
	const token = useSelector(state=>state.token);
	const dispatch = useDispatch();

	const [tweet, setTweet] = useState([]);

	useEffect(() => {
		async function getTweets() {
				try {
					const data = {
						following: loggedUser.following,
						_id: loggedUser._id,
						token: loggedUser.token
					};
					const response = await fetch("http://localhost:3001/", {
						method: "POST",
						headers: {
							Accept: "application/json",
							"Content-Type": "application/json",
							"Authorization": `${token}`,
						},
						body: JSON.stringify(data),
					});
					const {tweets} = await response.json() 
					setTweet(tweets);
					dispatch({
						type: "SET_TWEETS",
						payload: tweets,
						});
				} catch {
					return alert("Algo salio mal. Verifica los datos ingresados");
				}
			}
		getTweets();
	}, []);

	return (
		<div>
			<div className="row">
				<div className="col-3">
					<LeftPanel />
				</div>
				<div className="col-6">
					{/* <!-- sidebar starts -->
		<%- include ("modal") %>
		<%- include ("modalTweet") %>
		<!-- sidebar ends --> */}

					{/* <!-- feed starts --> */}
					<div className="feed">
						<div className="feed__header">
							<h2>Home</h2>
						</div>

						{/* <!-- tweetbox starts --> */}
						<div className="tweetBox">
							<form action="/create" method="POST">
								<div className="tweetbox__input">
									<img
										src="https://i.pinimg.com/originals/a6/58/32/a65832155622ac173337874f02b218fb.png"
										alt=""
									/>
									<input
										type="text"
										name="content"
										placeholder="What's happening?"
									/>
								</div>
								<button type="submit" className="tweetBox__tweetButton">
									Tweet
								</button>
							</form>
						</div>
						<Tweet tweet={tweet} />
					</div>
				</div>
				<div className="col-3">
					<RightPanel />
				</div>
			</div>
		</div>
	);
}

export default Dashboard;
