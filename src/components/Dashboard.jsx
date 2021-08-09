import React from "react";
import "./dashboard.css";
import LeftPanel from "./LeftPanel";
import RightPanel from "./RightPanel";

function Dashboard() {
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
						{/* <!-- tweetbox ends -->

			<!-- Tweets -->
			{/* <% tweets.forEach(tweet => { %> */}
						<div className="post">
							<div className="post__avatar">
								<img src="" alt="Foto autor del Tweet" />
							</div>

							<div className="post__body">
								<div className="post__header">
									<div className="post__headerText">
										<h3>
											{/* <a href="/<%=tweet.author.username%>"><%=tweet.author.firstname%></a>
								<span className="post__headerSpecial"
									><span className="material-icons post__badge">
										verified <a href="/<%=tweet.author.username%>"></span>@<%=tweet.author.username%></span></a> */}
											{/* <span className="date"
									><% if
									(!moment(tweet.date).isBefore(moment().startOf("day")))
									{ %> <%= moment(tweet.date, "YYYYMMDD").fromNow(); %>
									<% } else { %> <%= moment(tweet.date ,
									"YYYYMMDD").format("MMM Do YY"); %> <% } %>
								</span> */}
										</h3>
									</div>
									<div className="post__headerDescription">
										{/* <p><%= tweet.content %></p> */}
									</div>
								</div>
								<div className="post__footer d-flex align-items-center">
									<span className="material-icons"> repeat </span>
									{/* <div className=" ">
							<%if (loggedUser) {%> <% if(!loggedUser.tweetsLiked.some(arrVal =>
							tweet.id=== arrVal.toString() )){%>
							<a href="/like/<%=tweet.id%>">
								<i className="material-icons unliked-tweet align-bottom">
									favorite_border
								</i></a
							><span className="align-top"><%= tweet.likes %></span><%}else{%>
							<a href="/unlike/<%=tweet.id%>">
								<i className="material-icons liked-tweet align-bottom"> favorite </i></a
							> <span className="align-top"><%= tweet.likes %></span>
							<%}%><%}else{%>
							<i className="material-icons align-bottom"> favorite_border </i> <span className="align-top"><%= tweet.likes %></span><% }%>
						</div> */}
									<span className="material-icons"> publish </span>
								</div>
							</div>
						</div>
						{/* <!-- post ends -->
			<% }) %> */}
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
