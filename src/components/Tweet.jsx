import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import { Link, useParams } from "react-router-dom";
import "./index.css";

function Tweet({ tweet, setTweet, setRefresh, refresh }) {
  const { loggedUser } = useSelector((state) => state.tweetReducer);
  const { token } = useSelector((state) => state.authReducer);

  const dispatch = useDispatch();

  const [like, setLike] = useState(loggedUser.tweetsLiked.some((arrVal) => tweet._id === arrVal));
  const [countLike, setCountLike] = useState(tweet.likes);
  const [tweetId, setTweetId] = useState("");
  // const [deleteTweet, setDeleteTweet] = useState(false);
  async function handleDelete() {
    try {
      const data = {
        _id: tweet._id,
        token: token,
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
    // setTweet(tweet.filter((item) => tweet._id !== item._id));
  }

  function handleLike() {
    setTweetId(tweet._id);
    setCountLike((prev) => (like ? prev - 1 : prev + 1));
    setLike(!like);
    async function apiLike() {
      try {
        const data = {
          _id: loggedUser._id,
          token: loggedUser.token,
        };
        await fetch(`${process.env.REACT_APP_API_URL}/${like ? "unlike" : "like"}/${tweetId}`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        });
        const action = like ? "SET_LIKE" : "SET_UNLIKE";
        dispatch({
          type: `${action}`,
          payload: tweetId,
        });
      } catch {
        return alert("Algo salio mal en Like/UnLike");
      }
    }
    apiLike();
  }

  return (
    <div key={tweet._id}>
      <div className="row tweet-1">
        <div className="post__avatar col-2">
          <img className="" src={`${tweet.author.photo}`} alt="Avatar" />
        </div>
        <div className="tweet-txt col-10">
          {tweet.author._id === loggedUser._id && (
            <button
              className="trashicon"
              onClick={() => {
                // setDeleteTweet(true);
                handleDelete();
              }}
            >
              <i class="fas fa-trash-alt"></i>
            </button>
          )}
          <div className="tweet-name-date">
            <Link to={`/${tweet.author.username}`}>
              <strong> {tweet.author.firstname}</strong>
              <span className="twitter-account"> @{tweet.author.username}</span>
            </Link>
            -<span className="date">{!moment(tweet.date).isBefore(moment().startOf("day")) ? moment(tweet.date, "YYYYMMDD").fromNow() : moment(tweet.date, "YYYYMMDD").format("MMM Do YY")}</span>
          </div>
          <div className="message d-flex align-items-center">{tweet.content}</div>
          <div className="tweet-icons d-flex justify-content-between px-2">
            <div className="row w-100">
              <div className="col-3">
                <i className="far fa-comment"></i>
              </div>
              <div className="col-3">
                <i className="fas fa-retweet"></i>
              </div>
              <div className="col-3">
                <button
                  className="heart shadow"
                  onClick={() => {
                    handleLike();
                  }}
                >
                  {like ? <i className="fas fa-heart">{countLike}</i> : <i className="far fa-heart">{countLike}</i>}
                </button>
              </div>
              <div className="col-3">
                <i className="fas fa-external-link-alt"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tweet;
