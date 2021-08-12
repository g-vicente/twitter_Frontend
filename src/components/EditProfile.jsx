import React from "react";

function EditProfile() {
  return (
    <div>
      <div class="ruban">
        <div class="inner-content">
          <div class="logo">
            <a href="/login">
              <i class="fab fa-twitter"></i>
              Log In
            </a>
          </div>
          <div>About</div>
        </div>
      </div>

      <div id="sign-up">
        <div class="logo">
          <a href="index.html">
            <i class="fab fa-twitter fa-2x"></i>
          </a>
        </div>
        <form action="/userUpdate/<%=loggedUser.id%>" method="POST" enctype="multipart/form-data">
          <label for="photo">Profile Picture</label>
          <div class="row">
            <div class="col-2"></div>
            <div class="col-10">
              <div class="form-group">
                <div class="custom-file">
                  <input type="file" class="custom-file-input" name="photo" id="photo" />
                  <label class="custom-file-label" for="photo">
                    Choose file
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div class="form-group">
            <label for="backgroundPhoto">Background Picture</label>
            <div class="form-group">
              <div class="custom-file">
                <input type="file" class="custom-file-input" name="backgroundPhoto" />
                <label class="custom-file-label" for="backgroundPhoto">
                  Choose file
                </label>
              </div>
            </div>
          </div>
          <div class="form-group">
            <label for="firstname">First Name</label>
            <input type="text" class="form-control" name="firstname" id="firstname" value="<%= user.firstname %>" />
          </div>
          <div class="form-group">
            <label for="lastname">Last Name</label>
            <input type="text" class="form-control" id="lastname" name="lastname" value="<%= user.lastname %>" />
          </div>
          <div class="form-group"></div>
          <div class="form-group">
            <label for="description">Description</label>
            <textarea type="text" class="form-control" id="description" name="description" placeholder="Description" cols="30" rows="10"></textarea>
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
