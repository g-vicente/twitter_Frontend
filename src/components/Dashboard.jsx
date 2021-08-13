import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./dashboard.css";
import LeftPanel from "./LeftPanel";
import RightPanel from "./RightPanel";
import Tweet from "./Tweet";

function Dashboard() {
  const { loggedUser } = useSelector((state) => state.tweetReducer);
  const { token } = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();

  const [tweet, setTweet] = useState([]);
  const [newTweet, setNewTweet] = useState("");

  useEffect(() => {
    async function getTweets() {
      try {
        const data = {
          following: loggedUser.following,
          _id: loggedUser._id,
          token: loggedUser.token,
        };
        const response = await fetch("http://localhost:3001/", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        });
        const { tweets } = await response.json();
        setTweet(tweets);
      } catch {
        return alert("Algo salio mal. Verifica los datos ingresados");
      }
    }
    getTweets();
  }, [tweet]);

  async function handleTweet() {
    if (newTweet) {
      try {
        const data = {
          content: newTweet,
        };
        const response = await fetch("http://localhost:3001/tweet", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        });
        const createdTweet = await response.json();
        setTweet([...tweet, createdTweet]);
        dispatch({
          type: `CREATE_TWEET`,
          payload: createdTweet._id,
        });
        setNewTweet("");
      } catch {
        // return alert("Algo salio mal. Verifica los datos ingresados hola");
      }
    }
  }

  return (
    <div className="container">
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
          <div className="">
            <div className="">
              <h2>Home</h2>
            </div>

            {/* <!-- tweetbox starts --> */}
            <div className="tweetBox">
              <form
                onSubmit={(event) => {
                  handleTweet();
                  event.preventDefault();
                }}
              >
                <div className="tweetbox__input">
                  <img src="https://i.pinimg.com/originals/a6/58/32/a65832155622ac173337874f02b218fb.png" alt="" />
                  <input type="text" name="content" placeholder="What's happening?" value={newTweet} onChange={(e) => setNewTweet(e.target.value)} />
                </div>
                <button type="submit" className="tweetBox__tweetButton">
                  Tweet
                </button>
              </form>
            </div>
            {tweet.map((item) => {
              return <Tweet tweet={item} />;
            })}
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
