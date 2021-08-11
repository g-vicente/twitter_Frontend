import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import { Link, useParams } from "react-router-dom";

function Tweet({ tweet }) {
  const { loggedUser } = useSelector((state) => state.tweetReducer);
  const token = useSelector((state) => state.token);
  const dispatch = useDispatch();
  const [like, setLike] = useState(
    !loggedUser.tweetsLiked.some((arrVal) => tweet.id === arrVal.toString())
  );
  const [tweetId, setTweetId] = useState("");

  useEffect(() => {
    async function apiLike() {
      try {
        const data = {
          _id: loggedUser._id,
          token: loggedUser.token,
        };
		console.log(tweetId);
        /* await fetch(
          `http://localhost:3001/${like ? "like" : "unlike"}/${tweetId}`,

          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `${token}`,
            },
            body: JSON.stringify(data),
          }
        ); */
        const action = like ? "SET_LIKE" : "SET_UNLIKE";
        dispatch({
          type: `${action}`,
          payload: tweetId,
        });
        /* dispatch({
						type: "SET_FOLLOW",
						payload: following,
					}); */
      } catch {
        return alert("Algo salio mal. Verifica los datos ingresados");
      }
    }
    apiLike();
  }, [like]);

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
                  {!moment(tweet.date).isBefore(moment().startOf("day"))
                    ? moment(tweet.date, "YYYYMMDD").fromNow()
                    : moment(tweet.date, "YYYYMMDD").format("MMM Do YY")}
                </span>
              </div>
              <div className="message">{tweet.content}</div>
              <div className="tweet-icons">
                <i className="far fa-comment"></i>
                <i className="fas fa-retweet"></i>
                {/* 		{ <%if (loggedUser) {%> <% */}
                {like ? (
                  <button
                    onClick={() => {
                      setLike((prev) => !prev);
					  setTweetId(tweet._id);
                    }}
                  >
                    <i className="far fa-heart">{tweet.likes}</i>
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setLike((prev) => !prev);
					  setTweetId(tweet._id);
                    }}
                  >
                    <i className="fas fa-heart">{tweet.likes}</i>
                  </button>
                )}
                {/* <%}else{%> */}
                {/* <%}%><%}else{%><i className="fas fa-heart"><%= tweet.likes %></i
                  ><% }%> */}
                <i className="fas fa-external-link-alt"></i>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Tweet;
