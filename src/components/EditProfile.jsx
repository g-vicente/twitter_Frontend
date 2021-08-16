import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function EditProfile() {
  // const dispatch = useDispatch();
  const { loggedUser } = useSelector((state) => state.userReducer);
  const { token } = useSelector((state) => state.authReducer);
  // const { username } = useParams();

  const [photo, setPhoto] = useState("");
  const [backgroundPhoto, setBackgroundPhoto] = useState("");
  const [firstname, setFirstname] = useState(loggedUser.firstname);
  const [lastname, setLastname] = useState(loggedUser.firstname);
  const [description, setDescription] = useState(loggedUser.firstname);

  async function submit(e) {
    try {
      console.log(e);
      let formData = new FormData(e.target);
      await fetch(`${process.env.REACT_APP_API_URL}/users`, {
        method: "PATCH",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
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
        <form
          className="bg-secondary rounded shadow p-4"
          onSubmit={(e) => {
            e.preventDefault();
            submit(e);
          }}
        >
          <label for="photo">Profile Picture</label>

          <div class="row">
            <div class="col-4">
              <div class="form-group">
                <div class="custom-file">
                  <input
                    type="file"
                    class="custom-file-input"
                    name="photo"
                    id="photo"
                    accept="image/png,image/gif,image/jpeg"
                    multiple="false"
                    // value={`${photo}`}
                    onChange={(e) => {
                      console.log(e.target.files);
                      // setPhoto(e.target.files[0].name);
                    }}
                  />
                </div>
              </div>
            </div>
            <div class="col-4">
              <img
                className="img-fluid rounded-circle profileImg w-25 imagehover"
                src={`/${loggedUser.photo}`}
                alt="Current profile photo"
              />
            </div>
          </div>
          <div class="form-group">
            <label for="backgroundPhoto">Background Picture</label>
            <div class="form-group">
              <div class="custom-file">
                <input
                  type="file"
                  class="custom-file-input"
                  name="backgroundPhoto"
                  id="backgroundPhoto"
                  // value={`${backgroundPhoto}`}
                  onChange={(e) => {
                    console.log(e.target.files);
                    // setBackgroundPhoto(e.target.files[0].name);
                  }}
                />
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
              value={`${firstname}`}
              onChange={(e) => setFirstname(e.target.value)}
            />
          </div>
          <div class="form-group">
            <label for="lastname">Last Name</label>
            <input
              type="text"
              class="form-control"
              id="lastname"
              name="lastname"
              value={`${lastname}`}
              onChange={(e) => setLastname(e.target.value)}
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
              value={`${description}`}
              onChange={(e) => setDescription(e.target.value)}
              cols="30"
              rows="10"
            ></textarea>
          </div>
          <button type="submit" class="btn btn-primary">
            Save
          </button>
        </form>
        <form action="">
          <div>Change Password</div>
        </form>
        <button className="btn btn-danger">Delete User</button>
      </div>
    </div>
  );
}

export default EditProfile;
