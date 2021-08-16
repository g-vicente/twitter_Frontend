import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./dashboard.css";
import LeftPanel from "./LeftPanel";
import RightPanel from "./RightPanel";
import Tweet from "./Tweet";
import InfiniteScroll from "react-infinite-scroll-component";
import Modal from "./Modal";
import ModalTweet from "./ModalTweet";

function Dashboard() {
	const { loggedUser, tweets } = useSelector((state) => state.userReducer);
	const { token } = useSelector((state) => state.authReducer);
	const dispatch = useDispatch();

	// const [tweet, setTweet] = useState([]);
	const [newTweet, setNewTweet] = useState("");
	const [refresh, setRefresh] = useState(false);
	const [page, setPage] = useState(1);
	const [pagesTotal, setPagesTotal] = useState(3);

	useEffect(() => {
		async function getTweets() {
			try {
				const data = {
					following: loggedUser.following,
					page: page,
				};
				const response = await fetch(`${process.env.REACT_APP_API_URL}`, {
					method: "POST",
					headers: {
						Accept: "application/json",
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
					body: JSON.stringify(data),
				});

				if (page <= pagesTotal) {
					const { tweets, totalPages } = await response.json();

					setPagesTotal(totalPages);
					// setTweet(tweets);
					dispatch({
						type: `SET_USER`,
						payload: loggedUser,
					});
					dispatch({
						type: `SET_TWEETS`,
						payload: tweets,
					});
				}
			} catch {
				return alert("Algo salio mal. Verifica los datos ingresados");
			}
		}
		getTweets();
	}, [refresh, page]);

	async function handleTweet() {
		if (newTweet) {
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
			// setTweet([...tweet, createdTweet]);
			console.log(createdTweet);
			dispatch({
				type: `CREATE_TWEET`,
				payload: createdTweet,
			});

			setNewTweet("");
			setRefresh(!refresh);
		}
	}

	return (
		<div className="container">
			<div className="row">
				<div className="col-md-3">
					<LeftPanel />
				</div>
				<div className="col-md-6">
					<div>
						<div className="row">
							<div className="col-md-12">
								<div className="border-gray position-fixed bg-dark">
									<h2>Home</h2>
								</div>

								{/* <!-- tweetbox starts --> */}
								<div className="tweetBox border-gray mt-5">
									<form
										onSubmit={(event) => {
											handleTweet();
											event.preventDefault();
										}}
									>
										<div className="tweetbox__input">
											<img src={`${loggedUser.photo}`} alt="" />
											<textarea
												type="text"
												name="content"
												placeholder="What's happening?"
												value={newTweet}
												onChange={(e) =>
													setNewTweet(e.target.value)
												}
											/>
										</div>
										<button
											type="submit"
											className="tweetBox__tweetButton"
										>
											Tweet
										</button>
									</form>
								</div>
							</div>
							<InfiniteScroll
								dataLength={page}
								next={() => setPage((prev) => prev + 1)}
								scrollThreshold={1}
								hasMore={page !== pagesTotal ? true : false}
								loader={<h4>loading...</h4>}
								endMessage={
									<p className="m-5 text-center">
										No hay mas tweets para cargar en este momento
									</p>
								}
								initialScrollY={0}
							>
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
							</InfiniteScroll>
						</div>
					</div>
				</div>
				<div className="col-md-3">
					<RightPanel />
				</div>
			</div>
			<Modal />
			<ModalTweet refresh={refresh} setRefresh={setRefresh} />
		</div>
	);
}

export default Dashboard;
