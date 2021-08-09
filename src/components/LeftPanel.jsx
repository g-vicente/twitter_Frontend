import React from 'react'
import './dashboard.css'

function LeftPanel() {
    return (
        <div>
            <div class="sidebar">
                <i class="fab fa-twitter"></i>
                <div class="sidebarOption active">
                    <span class="material-icons"> home </span>
                    <a href="/">
                    <h2>Home</h2>
                    </a>
                </div>

                {/* <% if (loggedUser) { %> */}
                <a type="button" data-bs-toggle="modal" data-bs-target="#Modal">
                    <div class="sidebarOption">
                    <span class="material-icons"> search </span>
                    <h2>Explore</h2>
                    </div></a
                >

                <a type="button" data-bs-toggle="modal" data-bs-target="#Modal">
                    <div class="sidebarOption">
                    <span class="material-icons"> notifications_none </span>
                    <h2>Notifications</h2>
                    </div></a
                >

                <a type="button" data-bs-toggle="modal" data-bs-target="#Modal">
                    <div class="sidebarOption">
                    <span class="material-icons"> mail_outline </span>
                    <h2>Messages</h2>
                    </div></a
                >

                <a type="button" data-bs-toggle="modal" data-bs-target="#Modal">
                    <div class="sidebarOption">
                    <span class="material-icons"> bookmark_border </span>
                    <h2>Bookmarks</h2>
                    </div></a
                >

                <a type="button" data-bs-toggle="modal" data-bs-target="#Modal">
                    <div class="sidebarOption">
                    <span class="material-icons"> list_alt </span>
                    <h2>Lists</h2>
                    </div></a
                >

                <div class="sidebarOption">
                    <span class="material-icons"> perm_identity </span>
                    <a href="/<%= loggedUser.username %> "> <h2>Profile</h2></a>
                </div>

                <a type="button" data-bs-toggle="modal" data-bs-target="#Modal">
                    <div class="sidebarOption">
                    <span class="material-icons"> more_horiz </span>
                    <h2>More</h2>
                    </div></a
                >
                <button class="sidebar__tweet" data-bs-toggle="modal" data-bs-target="#ModalTweet"><h2>Tweet</h2></button>
                {/* <% } else { %>
                <a type="button" data-bs-toggle="modal" data-bs-target="#Modal">
                    <div class="sidebarOption">
                    <span class="material-icons"> search </span>
                    <h2>Explore</h2>
                    </div></a
                >

                <% } %> */}
                </div>

        </div>
    )
}

export default LeftPanel
