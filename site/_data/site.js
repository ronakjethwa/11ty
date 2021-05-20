module.exports = {
  name: "Ronak Jethwa",
  shortDesc:
    "Want to chat? Drop me a note on ronakjethwa@gmail.com.",
  url: "",
  authorEmail: "ronakjethwa@gmail.com",
  authorHandle: "@RonakJethwa",
  authorName: "Ronak Jethwa",
  postsPerPage: 4,
  socialImage: "/img/social.jpg",
  theme: {
    primary: {
      background: "white",
      text: "black",
      highlight: "#666",
    },
    secondary: {
      background: "black",
      text: "white",
      highlight: "#666",
    },
  },

  keystone: {
    comments: true,
    bookmarks: true,
    claps: true,
    login: true,
  },
  // Critical CSS results in much slower build times and uses a lot of system resources
  // turn on in production :)
  // See `site/transforms/critical-css-transform.js` for more details
  criticalCSS: true,
};
