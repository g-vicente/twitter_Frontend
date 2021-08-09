import React, { useState, useEffect } from "react";
import "./index.css";
import LeftPanel from "./LeftPanel";
import RightPanel from "./RightPanel";
import { Link, useParams } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
const Profile = () => {
	const { username } = useParams();

	const [profile, setProfile] = useState({});
	const [tweet, setTweet] = useState([]);

	useEffect(() => {
		async function api() {
			const response = await fetch(`http://localhost:3001/${username}`, {
				method: "GET",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
			});
			const { user, tweets } = await response.json();
			setProfile(user);
			setTweet(tweets);
		}
		api();
	}, []);

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
							<form action="/create" method="POST">
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
									{/* <%if (loggedUser&&loggedUser.id !== user.id) {%>
									<!-- aa -->
									<% if(!loggedUser.following.some(arrVal => user.id===
									arrVal.toString() )){%> */}
									{/* <a href="/follow/<%= user.id %>">Follow</a> */}
									<Link to={`/follow/${profile.id}`}>Follow</Link>  //Cambiar a por un onClick
									{/* <%}else{%> */}
									<Link to={`/unfollow/${profile.id}`}>Unfollow</Link>
									{/* <%}%><%}%> */}
								</div>
								<div className="post-icons">
									<div className="second-post-icons">
										<i className="far fa-circle"></i>
										<i className="fas fa-plus-circle"></i>
										<Link to={`/edit/${profile.username}`}>
											Edit Profile
										</Link>
									</div>
								</div>
							</form>
						</div>
					</main>

					{/* <!--TWEEEEEETS--> */}
					<section id="tweets">
						{/* <!--1 tweet--> */}
						{tweet.map((tweet) => {
							return (
								<div className="tweet-1" key={tweet._id}>
									<div className="tweet-img">
										<img src={`${tweet.author.photo}`} alt="Avatar" />
									</div>
									<div className="tweet-txt">
										<div className="tweet-name-date">
											<strong> {tweet.author.firstname}</strong>
											<span className="twitter-account">
												@{tweet.author.username}
											</span>
											-
											<span className="date">
												{!moment(tweet.date).isBefore(
													moment().startOf("day")
												)
													? moment(
															tweet.date,
															"YYYYMMDD"
													  ).fromNow()
													: moment(
															tweet.date,
															"YYYYMMDD"
													  ).format("MMM Do YY")}
											</span>
										</div>
										<div className="message">{tweet.content}</div>
										<div className="tweet-icons">
											<i className="far fa-comment"></i>
											<i className="fas fa-retweet"></i>
											{/* <%if (loggedUser) {%> <%
									{/* if(!loggedUser.tweetsLiked.some(arrVal => tweet.id===
                  arrVal.toString() )){%> */}
											<a href="/like/<%=tweet.id%>">
												<i className="far fa-heart"> //Cambiar a por un onClick
													{tweet.likes}
												</i>
											</a>
											{/* <%}else{%> */}
											<a href="/unlike/<%=tweet.id%>">
												<i className="fas fa-heart">
													{tweet.likes}
												</i>
											</a>
											{/* <%}%><%}else{%><i className="fas fa-heart"><%= tweet.likes %></i
                  ><% }%> */}
											<i className="fas fa-external-link-alt"></i>
										</div>
									</div>
								</div>
							);
						})}
						{/* <!--1 tweet--> */}
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
