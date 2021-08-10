import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import "./index.css";
import LeftPanel from "./LeftPanel";
import RightPanel from "./RightPanel";
import Tweet from "./Tweet";


const Profile = () => {
    const {loggedUser} = useSelector(state=>state.tweetReducer);
	const token = useSelector(state=>state.token);
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
					"Authorization": `${token}`,
				},
			});
			const { user, tweets } = await response.json();
			setProfile(user);
			setTweet(tweets);
		}
		api();
	}, []);

 /*    async function handlerFollow() {
        cambiar el boton a unfollow
        enviar json logeado y follow
    }
 */
 /*    async function handlerUnfollow() {
        cambiar el boton a unfollow
    } */

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
									{/* {(loggedUser&&loggedUser.user.username !== username)} */}
                                    {!loggedUser.following.some(arrVal => profile.id===
									arrVal.toString() ) ? 
                                    <button onClick={console.log(loggedUser)}></button>:
                                    <button onClick={console.log(2)}></button>}
                                  
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
						<Tweet tweet={tweet} />
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
