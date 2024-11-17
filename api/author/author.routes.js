const express = require("express");
const {
  authorCreate,
  postsCreate,
  fetchAuth,
  authorGet,
} = require("./author.controllers");
const router = express.Router();
console.log(postsCreate, "sadsada");

router.param("authorId", async (req, res, next, authorId) => {
  const author = await fetchAuth(authorId, next);
  console.log(author, "author");

  if (author) {
    req.author = author;
    next();
  } else {
    const err = new Error("author Not Found");
    err.status = 404;
    next(err);
  }
});

router.post("/:authorId/posts", postsCreate);

router.post("/", authorCreate);
router.get("/", authorGet);
module.exports = router;
