 {/* <!-- feed starts --> */}
 <div>
 <div className="row">
   <div className="border-gray position-fixed bg-dark">
     <h2>Home</h2>
   </div>

   {/* <!-- tweetbox starts --> */}
   <div className="tweetBox border-gray mt-5">
     <form
       onSubmit={(event) => {
         handleTweet();
         event.preventDefault();
       }}
     >
       <div className="tweetbox__input">
         <img src="https://i.pinimg.com/originals/a6/58/32/a65832155622ac173337874f02b218fb.png" alt="" />
         <textarea type="text" name="content" placeholder="What's happening?" value={newTweet} onChange={(e) => setNewTweet(e.target.value)} />
       </div>
       <button type="submit" className="tweetBox__tweetButton">
         Tweet
       </button>
     </form>
   </div>
 </div>
 {tweet.map((item) => {
   return <Tweet tweet={item} setRefresh={setRefresh} refresh={refresh} />;
 })}
</div>
</div>
<div className="col-3">
<RightPanel />
</div>
</div>
</div>
);