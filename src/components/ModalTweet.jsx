import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./dashboard.css";

function TweetModal() {
  const { token } = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();

  const [tweet, setTweet] = useState([]);
  const [newTweet, setNewTweet] = useState("");

  async function handleTweet() {
    if (newTweet) {
      try {
        setNewTweet("");
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
      } catch {
        // return alert("Algo salio mal. Verifica los datos ingresados hola");
      }
    }
  }
  return (
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal fade" id="ModalTweet" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Tweet
              </h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body tweetBox">
              <form
                onSubmit={(event) => {
                  handleTweet();
                  event.preventDefault();
                }}
              >
                <div class="tweetbox__input">
                  <img src="https://i.pinimg.com/originals/a6/58/32/a65832155622ac173337874f02b218fb.png" alt="" />
                  <input type="text" name="content" placeholder="What's happening?" value={newTweet} onChange={(e) => setNewTweet(e.target.value)} />
                </div>
                <button type="submit" class="tweetBox__tweetButton" data-bs-dismiss="modal">
                  Tweet
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TweetModal;
