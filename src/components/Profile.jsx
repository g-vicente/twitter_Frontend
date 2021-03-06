import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
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
  const history = useHistory();

  // const [profile, setProfile] = useState({});
  const [tweet, setTweet] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [tweetLength, setTweetLength] = useState(0);
  const [following, setFollowing] = useState(false);
  const [followingCount, setFollowingCount] = useState(0);
  const [followersCount, setFollowersCount] = useState(0);

  useEffect(() => {
    async function api() {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/user/${username}`,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        );
        const { user, tweets } = await response.json();
        dispatch({
          type: `SET_USER`,
          payload: user,
        });
        dispatch({
          type: `SET_TWEETS`,
          payload: tweets,
        });
        console.log(tweets);
        setTweetLength(tweets.length);
        if (token) {
          setFollowing(loggedUser.following.some((arrVal) => user._id === arrVal));
        }
        setFollowingCount(user.followingCount);
        setFollowersCount(user.followersCount);
      } catch {
        history.push("/");
        alert("El usuario no existe");
      }
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
      await fetch(`${process.env.REACT_APP_API_URL}/follow/${profile._id}`, {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
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
        <div className="col-md-6">
          <div class="row g-2 p-0">
            <div class="col-1 pt-2">
              <Link to="/">
                <i class="fas fa-arrow-left flecha p-3"></i>
              </Link>
            </div>
            <div class="col-11 pt-2 px-3">
              <h4 class="my-0 bold">
                {profile.firstname} {profile.lastname}
              </h4>
              <p class="my-0">{tweetLength} Tweets</p>
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
                <strong> {followingCount} </strong> {`Following  `}
                <strong>{followersCount}</strong> Followers
              </div>
              {loggedUser && (
                <div class="col text-end">
                  {profile.username !== loggedUser.username ? (
                    <button
                      onClick={handleFollow}
                      className="btn btn-primary rounded-pill follow"
                    >
                      {following === false ? "Follow" : "Unfollow"}
                    </button>
                  ) : (
                    <Link
                      to={`/edit/${loggedUser.username}`}
                      className="btn btn-primary rounded-pill follow"
                    >
                      Edit Profile
                    </Link>
                  )}
                </div>
              )}
            </div>
            <h5 className="bold pt-4">Bio</h5>
            <p> {profile.description} </p>
            <h4 className="mt-5 fontBlue">Tweets</h4>
          </div>

          {/* <!--TWEEEEEETS-->  */}
          <section id="tweets">
            {tweet.map((tweet) => {
              return <Tweet tweet={tweet} setRefresh={setRefresh} refresh={refresh} />;
            })}
          </section>
        </div>

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
