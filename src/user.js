const user = {
  _id: { $oid: "60fb13ead792e21f98e750c5" },
  tweets: [],
  tweetsLiked: [],
  tweetCount: 0,
  followers: [],
  followersCount: 0,
  following: [
    { $oid: "60fb13ead792e21f98e750df" },
    { $oid: "60fb13ead792e21f98e750f1" },
  ],
  followingCount: 2,
  firstname: "Raphael",
  lastname: "Wisoky",
  username: "user1",
  email: "Aiden.Purdy70@yahoo.com",
  description:
    "Repellendus dolor facilis ut ut quo perferendis velit aut quaerat.",
  photo: "assets/images/img_avatar.png",
  backgroundPhoto: "assets/images/about-bg.jpg",
  password: "$2b$10$3QMw7.B.WqS2vQavLs.xuO8BBLaarRds/KEUyGXqqeGu8YBgNIwgq",
  __v: 0,
};

export default user;
