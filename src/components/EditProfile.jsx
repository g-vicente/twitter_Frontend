import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function EditProfile() {
  // const dispatch = useDispatch();
  const { loggedUser } = useSelector((state) => state.tweetReducer);
  const { token } = useSelector((state) => state.authReducer);
  let myForm = document.getElementById("myForm");
  // const { username } = useParams();

  async function submit(e) {
    try {
      let formData = new FormData(e.target);
      await fetch(`${process.env.REACT_APP_API_URL}/user`, {
        method: "PATCH",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      // dispatch({
      //   type: "TWEET_DELETE",
      //   payload: tweet._id,
      // });
      // setRefresh(!refresh);
    } catch {
      return alert("Error en el Update");
    }
  }

  return (
    <div>
      <div id="sign-up">
        <div class="logo">
          <Link to="/">
            <i class="fab fa-twitter fa-2x"></i>
          </Link>
        </div>
        <form onSubmit={(e) => submit(e)} className="bg-secondary rounded shadow p-4">
          <label for="photo">Profile Picture</label>
          <div class="row">
            <div class="col-4">
              <div class="form-group">
                <div class="custom-file">
                  <input type="file" class="custom-file-input" name="photo" id="photo" />
                </div>
              </div>
            </div>
            <div class="col-4">
              <img
                src={`/${loggedUser.photo}`}
                className="img-fluid rounded-circle profileImg w-25 imagehover"
                alt="Current profile photo"
              />
            </div>
          </div>
          <div class="form-group">
            <label for="backgroundPhoto">Background Picture</label>
            <div class="form-group">
              <div class="custom-file">
                <input type="file" class="custom-file-input" name="backgroundPhoto" />
              </div>
            </div>
          </div>
          <div class="form-group">
            <label for="firstname">First Name</label>
            <input
              type="text"
              class="form-control"
              name="firstname"
              id="firstname"
              value={`${loggedUser.firstname}`}
            />
          </div>
          <div class="form-group">
            <label for="lastname">Last Name</label>
            <input
              type="text"
              class="form-control"
              id="lastname"
              name="lastname"
              value={`${loggedUser.lastname}`}
            />
          </div>
          <div class="form-group"></div>
          <div class="form-group">
            <label for="description">Description</label>
            <textarea
              type="text"
              class="form-control"
              id="description"
              name="description"
              placeholder="Description"
              value={`${loggedUser.description}`}
              cols="30"
              rows="10"
            ></textarea>
          </div>

          <button type="submit" class="btn btn-primary">
            Save
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditProfile;
