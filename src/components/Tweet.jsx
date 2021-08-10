import React from 'react'
import moment from 'moment'

function Tweet({tweet}) {
    return (
      <div>
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
      </div>
    )
}

export default Tweet
