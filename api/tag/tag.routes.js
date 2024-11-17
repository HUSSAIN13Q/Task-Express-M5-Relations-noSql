const express = require("express");
const { addTag } = require("./tag.controllers");
const { fetchPost } = require("../posts/posts.controllers");
const router = express.Router();
console.log(addTag);

router.param("postId", async (req, res, next, postId) => {
  const post = await fetchPost(postId, next);
  if (post) {
    req.post = post;
    next();
  } else {
    const err = new Error("Post Not Found");
    err.status = 404;
    next(err);
  }
});
router.post("/:postId", addTag);

module.exports = router;
