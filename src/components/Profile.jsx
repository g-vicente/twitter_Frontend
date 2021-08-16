import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./index.css";
import LeftPanel from "./LeftPanel";
import RightPanel from "./RightPanel";
import Tweet from "./Tweet";
import Modal from "./Modal";
import ModalTweet from "./ModalTweet";

const Profile = () => {
	const dispatch = useDispatch();
	const { token } = useSelector((state) => state.authReducer);
	const { loggedUser, tweets, profile } = useSelector((state) => state.userReducer);
	const { username } = useParams();

	// const [profile, setProfile] = useState({});
	// const [tweet, setTweet] = useState([]);
	const [refresh, setRefresh] = useState(false);
	const [tweetLength, setTweetLength] = useState(0);
	const [following, setFollowing] = useState(false);
	const [followingCount, setFollowingCount] = useState(0);
	const [followersCount, setFollowersCount] = useState(0);

	useEffect(() => {
		console.log("entro al useeffect");
		async function api() {
			const response = await fetch(`${process.env.REACT_APP_API_URL}/${username}`, {
				method: "GET",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
			});
			const { user, tweets } = await response.json();
			dispatch({
				type: `SET_USER`,
				payload: user,
			});
			dispatch({
				type: `SET_TWEETS`,
				payload: tweets,
			});
			// setProfile(user);
			// setTweet(tweets);
			setTweetLength(tweets.length);
			if (token) {
				setFollowing(loggedUser.following.some((arrVal) => user._id === arrVal));
			}
			setFollowingCount(user.followingCount);
			setFollowersCount(user.followersCount);
		}
		api();
	}, [refresh, username]);

	async function handleFollow() {
		setFollowing((prev) => !prev);
		if (!following) {
			setFollowersCount((prev) => prev + 1);
		} else {
			setFollowersCount((prev) => prev - 1);
		}
		try {
			await fetch(
				`${process.env.REACT_APP_API_URL}/${following ? "unfollow" : "follow"}/${
					profile._id
				}`,
				{
					method: "POST",
					headers: {
						Accept: "application/json",
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
				}
			);
			const action = following ? "SET_UNFOLLOW" : "SET_FOLLOW";
			dispatch({
				type: `${action}`,
				payload: profile._id,
			});
		} catch {
			return alert("Error en follow");
		}
	}
	return (
		<div>
			<div className="row">
				<div className="col-md-3">
					<LeftPanel />
				</div>

				{/* <!--middle block--> */}
				{profile !== [] && (
					<div className="col-md-6">
						<div className="row g-2 p-0">
							<div className="col-1 pt-2">
								<Link to="/">
									<i className="fas fa-arrow-left flecha p-3"></i>
								</Link>
							</div>
							<div className="col-11 pt-2 px-3">
								<h4 className="my-0 bold">
									{profile.firstname} {profile.lastname}
								</h4>
								<p className="my-0">{tweetLength} Tweets</p>
							</div>
						</div>
						<div className="px-3">
							<img
								src={`${profile.photo}`}
								className="img-fluid rounded-circle profileImg w-25 imagehover"
								alt="Responsive image"
							/>
							<h5 className="bold pt-4">
								{profile.firstname} {profile.lastname}
							</h5>
							<p className="mb-0">@{profile.username}</p>
							<i className="far fa-calendar-alt"></i>
							<div className="row">
								<div className="col">
									{/* <Link to={`/${profile.username}/following`} className="link me-2"> */}
									<strong> {followingCount} </strong> {`Following  `}
									{/* </Link> */}
									{/* <Link to={`/${profile.username}/followers`} className="link me-2"> */}
									<strong>{followersCount && followersCount}</strong>{" "}
									Followers
									{/* </Link> */}
								</div>
								<div className="col text-end">
									{token && profile.username !== loggedUser.username && (
										<button
											onClick={handleFollow}
											className="btn rounded-pill follow"
										>
											{following === false ? "Follow" : "Unfollow"}
										</button>
									)}
								</div>
							</div>
							<h5 className="bold pt-4">Bio</h5>
							<p> {profile.description} </p>
							<h4 className="mt-5 fontBlue">Tweets</h4>
						</div>

						{/* <!--TWEEEEEETS-->  */}
						<section id="tweets">
							{tweets.map((item) => {
								return (
									<Tweet
										tweet={item}
										setRefresh={setRefresh}
										refresh={refresh}
										key={item._id}
									/>
								);
							})}
						</section>
					</div>
				)}

				<div className="col-md-3">
					<RightPanel />
				</div>
			</div>
			<Modal />
			<ModalTweet refresh={refresh} setRefresh={setRefresh} />
		</div>
	);
};

export default Profile;
