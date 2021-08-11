import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./index.css";
import LeftPanel from "./LeftPanel";
import RightPanel from "./RightPanel";
import Tweet from "./Tweet";

const Profile = () => {
	const dispatch = useDispatch();
	const { loggedUser } = useSelector((state) => state.tweetReducer);
	const token = useSelector((state) => state.token);
	const { username } = useParams();

	const [profile, setProfile] = useState({});
	const [tweet, setTweet] = useState([]);
	const [following, setFollowing] = useState(false);
	// const [newfollowing, newSetFollowing] = useState("");

	useEffect(() => {
		async function api() {
			const response = await fetch(`http://localhost:3001/${username}`, {
				method: "GET",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
					Authorization: `${token}`,
				},
			});
			const { user, tweets } = await response.json();
			setProfile(user);
			setTweet(tweets);
			setFollowing(
				loggedUser.following.some((arrVal) => profile._id === arrVal.toString())
			);
		}
		api();
	}, []);

	useEffect(() => {
		async function apiFollow() {
			try {
				const data = {
					id: loggedUser._id,
					following: loggedUser.following,
					token: loggedUser.token,
				};
				await fetch(
					`http://localhost:3001/${following ? "follow" : "unfollow"}/${
						profile._id
					}`,
					{
						method: "POST",
						headers: {
							Accept: "application/json",
							"Content-Type": "application/json",
							Authorization: `${token}`,
						},
						body: JSON.stringify(data),
					}
				);

				const action = following ? "SET_FOLLOW" : "SET_UNFOLLOW";
				dispatch({
					type: `${action}`,
					payload: profile._id,
				});
			} catch {
				// return alert("Error en follow");
			}
		}
		apiFollow();
	}, [following]);

	/*    async function handlerUnfollow() {
        cambiar el boton a unfollow
    } */

	return (
		<div>
			<div className="row">
				<div className="col-3">
					<LeftPanel />
				</div>

				{/* <!--middle block--> */}
				<div className="col-lg-6 col-md-11 col-10">
					<main>
						<div className="first-part">
							<div>
								<Link className="home">Home</Link>
							</div>
							<div>
								<i className="far fa-star"></i>
							</div>
						</div>
						<div className="whats-happening">
							<div
								className="post-blocks"
								style={{
									backgroundImage: `url(${profile.backgroundPhoto})`,
									objectPosition: " 10% 50%",
								}}
							>
								<div className="post-profile">
									<p>BackgroundPhoto</p>
								</div>
								<div className="post-profile">
									<img
										src={`${profile.photo}`}
										className="avatar"
										alt="Avatar"
									/>
									<span>{profile.username}</span>
								</div>
								{/* {loggedUser && loggedUser.user.username !== username} */}
								{!following ? (
									<button
										onClick={() => {
											setFollowing((prev) => !prev);
										}}
									>
										Follow
									</button>
								) : (
									<button
										onClick={() => {
											setFollowing((prev) => !prev);
										}}
									>
										Unfollow
									</button>
								)}
							</div>
							{/* <div className="post-icons">
								<div className="second-post-icons">
									<i className="far fa-circle"></i>
									<i className="fas fa-plus-circle"></i>
									<Link to={`/edit/${profile.username}`}>
										Edit Profile
									</Link>
								</div>
							</div> */}
							{/* <form action="/create" method="POST"></form>*/}
						</div>
					</main>

					{/* <!--TWEEEEEETS-->  */}
					<section id="tweets">
						{/* <!--1 tweet--> */}
						<Tweet tweet={tweet} />
						{/* <!--1 tweet--> }*/}
					</section>
				</div>
				<div className="col-3">
					<RightPanel />
				</div>
			</div>
		</div>
	);
};

export default Profile;
