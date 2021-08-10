import React from 'react'
import './dashboard.css'
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

function LeftPanel() {
    const dispatch = useDispatch();
	const history = useHistory();
    
    const {loggedUser} = useSelector((state) => state.tweetReducer);

    async function handleLogOut() {
				dispatch({
					type: "LOGOUT_REQUEST",
				});
                dispatch({
					type: "CLEAR_DATA",
				});
				history.push("/signin");
	}

    return (
        <div>
            <div className="sidebar">
            <button onClick={(event) => {
						handleLogOut();
						event.preventDefault();
					}}>LogOut</button>
                <i className="fab fa-twitter"></i>
                <div className="sidebarOption active">
                    <span className="material-icons"> home </span>
                    <Link to={`/`}>
                    <h2>Home</h2>
                    </Link>
                </div>

                {/* <% if (loggedUser) { %> */}
                <Link to={`/modal`}>   
                    <div className="sidebarOption">
                    <span className="material-icons"> search </span>
                    <h2>Explore</h2>
                    </div>
                </Link>

                <Link to={`/modal`}>
                    <div className="sidebarOption">
                    <span className="material-icons"> notifications_none </span>
                    <h2>Notifications</h2>
                    </div></Link>

                <Link to={`/modal`}>
                    <div className="sidebarOption">
                    <span className="material-icons"> mail_outline </span>
                    <h2>Messages</h2>
                    </div></Link>

                <Link to={`/modal`}>
                    <div className="sidebarOption">
                    <span className="material-icons"> bookmark_border </span>
                    <h2>Bookmarks</h2>
                    </div></Link>

                <Link to={`/modal`}>
                    <div className="sidebarOption">
                    <span className="material-icons"> list_alt </span>
                    <h2>Lists</h2>
                    </div></Link>

                <div className="sidebarOption">
                    <span className="material-icons"> perm_identity </span>
                    <Link to={`/${loggedUser.username}`}> <h2>Profile</h2></Link>
                </div>

                <Link to={`/modal`}>
                    <div className="sidebarOption">
                    <span className="material-icons"> more_horiz </span>
                    <h2>More</h2>
                    </div></Link>
                <button className="sidebar__tweet" data-bs-toggle="modal" data-bs-target="#ModalTweet"><h2>Tweet</h2></button>
                {/* <% } else { %>
                <a type="button" data-bs-toggle="modal" data-bs-target="#Modal">
                    <div className="sidebarOption">
                    <span className="material-icons"> search </span>
                    <h2>Explore</h2>
                    </div></a
                >

                <% } %> */}
                </div>

        </div>
    )
}

export default LeftPanel
