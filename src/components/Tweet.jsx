import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import { Link, useParams } from "react-router-dom";
import "./index.css";

function Tweet({ tweet, setRefresh, refresh }) {
	const { profile } = useSelector((state) => state.userReducer);
	const { token } = useSelector((state) => state.authReducer);

	const dispatch = useDispatch();

	const [tweetId, setTweetId] = useState(tweet._id);
	const [like, setLike] = useState(
		profile.tweetsLiked.some((arrVal) => tweet._id === arrVal)
	);
	const [countLike, setCountLike] = useState(tweet.likes);

	async function handleDelete() {
		try {
			const data = {
				_id: tweet._id,
			};
			console.log(data);
			await fetch(`${process.env.REACT_APP_API_URL}/tweet`, {
				method: "DELETE",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(data),
			});
			console.log("hizo fetch");

			dispatch({
				type: "TWEET_DELETE",
				payload: tweet._id,
			});

			setRefresh(!refresh);
		} catch {
			return alert("Algo salio mal en Delete");
		}
	}

	function handleLike() {
		setTweetId(tweet._id);
		setCountLike((prev) => (like ? prev - 1 : prev + 1));
		setLike(!like);
		async function apiLike() {
			try {
				await fetch(`${process.env.REACT_APP_API_URL}/tweet/${tweetId}`, {
					method: "PATCH",
					headers: {
						Accept: "application/json",
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
				});
			} catch {
				return alert("Algo salio mal en Like/UnLike");
			}
		}
		const action = !like ? "SET_LIKE" : "SET_UNLIKE";
		dispatch({
			type: `${action}`,
			payload: tweetId,
		});

		apiLike();
	}

	return (
		<div>
			<div className="row tweet-1 border border-gray pb-2">
				<div className="post__avatar col-2">
					<img className="" src={`${tweet.author.photo}`} alt="Avatar" />
				</div>
				<div className="tweet-txt col-10">
					{tweet.author._id === profile._id && (
						<button
							className="trashicon"
							onClick={() => {
								handleDelete();
							}}
						>
							<i className="fas fa-trash-alt"></i>
						</button>
					)}
					<div className="tweet-name-date">
						<Link to={`/${tweet.author.username}`}>
							<strong> {tweet.author.firstname}</strong>
							<span className="twitter-account">
								{" "}
								@{tweet.author.username}
							</span>
						</Link>
						-
						<span className="date">
							{moment(tweet.date).isBefore(moment().startOf("day"))
								? moment(tweet.date, "YYYYMMDD").format("MMM Do YY")
								: moment(tweet.date, "YYYYMMDD").fromNow()}
						</span>
					</div>
					<div
						className="message d-flex align-items-center"
						data-bs-toggle="modal"
						data-bs-target={`#Modal`}
					>
						{tweet.content}
					</div>
					<div className="tweet-icons d-flex justify-content-between px-2">
						<div className="row w-100">
							<div className="col-3">
								<i
									className="far fa-comment"
									data-bs-toggle="modal"
									data-bs-target={`#Modal`}
								></i>
							</div>
							<div className="col-3">
								<i
									className="fas fa-retweet"
									data-bs-toggle="modal"
									data-bs-target={`#Modal`}
								></i>
							</div>
							<div className="col-3">
								{like ? (
									<i
										className="fas fa-heart liked shadow"
										onClick={() => {
											handleLike();
										}}
									>{`  ${countLike}`}</i>
								) : (
									<i
										className="far fa-heart shadow"
										onClick={() => {
											handleLike();
										}}
									>{`  ${countLike}`}</i>
								)}
							</div>
							<div className="col-3">
								<i
									className="fas fa-external-link-alt"
									data-bs-toggle="modal"
									data-bs-target={`#Modal`}
								></i>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Tweet;
