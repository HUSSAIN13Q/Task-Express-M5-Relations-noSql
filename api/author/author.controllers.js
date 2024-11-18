const Author = require("../../models/Author");
const Post = require("../../models/Post");

exports.authorGet = async (req, res, next) => {
  try {
    const authors = await Author.find().populate("posts", "-author", "-__v");
    res.json(authors);
  } catch (error) {
    next(error);
  }
};

exports.authorCreate = async (req, res, next) => {
  try {
    const newAuthor = await Author.create(req.body);
    res.status(201).json(newAuthor);
  } catch (error) {
    next(error);
  }
};

exports.postsCreate = async (req, res, next) => {
  try {
    req.body.author = req.author.id;
    const newPost = await Post.create(req.body);
    await Author.findByIdAndUpdate(req.author.id, {
      $push: { posts: newPost._id },
    });
    res.status(201).json(newPost);
  } catch (error) {
    next(error);
  }
};

exports.fetchAuth = async (authorId, next) => {
  try {
    const author = await Author.findById(authorId);
    return author;
  } catch (error) {
    next(error);
  }
};
