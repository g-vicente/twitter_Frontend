import React from "react";
import "./dashboard.css";
import { NavLink, Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

function LeftPanel() {
  const dispatch = useDispatch();
  const history = useHistory();

  const { loggedUser } = useSelector((state) => state.userReducer);

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
    <div className="position-fixed">
      <div>
        <div className="sidebar">
          <i className="fab fa-twitter"></i>
          <div className="sidebarOption active">
            <span className="material-icons"> home </span>
            <NavLink to={`/`}>
              <h2>Home</h2>
            </NavLink>
          </div>

          {/* <% if (loggedUser) { %> */}
          <div className="sidebarOption" data-bs-toggle="modal" data-bs-target={`#Modal`}>
            <span className="material-icons"> search </span>
            <h2>Explore</h2>
          </div>

          <div className="sidebarOption" data-bs-toggle="modal" data-bs-target={`#Modal`}>
            <span className="material-icons"> notifications_none </span>
            <h2>Notifications</h2>
          </div>

          <div className="sidebarOption" data-bs-toggle="modal" data-bs-target={`#Modal`}>
            <span className="material-icons"> mail_outline </span>
            <h2>Messages</h2>
          </div>

          <div className="sidebarOption" data-bs-toggle="modal" data-bs-target={`#Modal`}>
            <span className="material-icons"> bookmark_border </span>
            <h2>Bookmarks</h2>
          </div>

          <div className="sidebarOption" data-bs-toggle="modal" data-bs-target={`#Modal`}>
            <span className="material-icons"> list_alt </span>
            <h2>Lists</h2>
          </div>

          <div className="sidebarOption">
            <span className="material-icons"> perm_identity </span>
            <NavLink to={`/user/${loggedUser.username}`}>
              <h2>Profile</h2>
            </NavLink>
          </div>

          <div className="sidebarOption" data-bs-toggle="modal" data-bs-target={`#Modal`}>
            <span className="material-icons"> more_horiz </span>
            <h2>More</h2>
          </div>

          <button
            className="sidebar__tweet"
            data-bs-toggle="modal"
            data-bs-target="#ModalTweet"
          >
            <h2>Tweet</h2>
          </button>
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
      <div className="d-flex justify-content-center">
        <button
          className="logout  rounded-pill"
          onClick={(event) => {
            handleLogOut();
            event.preventDefault();
          }}
        >
          LogOut
        </button>
      </div>
    </div>
  );
}

export default LeftPanel;
