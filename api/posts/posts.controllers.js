const Author = require("../../models/Author");
const Post = require("../../models/Post");
const Tag = require("../../models/tag");
const { post } = require("./posts.routes");

exports.fetchPost = async (postId, next) => {
  try {
    const post = await Post.findById(postId);
    return post;
  } catch (error) {
    next(error);
  }
};

exports.postsDelete = async (req, res, next) => {
  try {
    await Post.findByIdAndRemove({ _id: req.post.id });
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

exports.postsUpdate = async (req, res, next) => {
  try {
    await Post.findByIdAndUpdate(req.post.id, req.body);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

exports.postsGet = async (req, res, next) => {
  try {
    const posts = await Post.find()
      .populate("author", "name", "-__v")
      .populate("tags", "name", "-__v");
    res.json(posts);
  } catch (error) {
    next(error);
  }
};

exports.tagCreate = async (req, res, next) => {
  try {
    console.log(req.body);
    const newTag = await Tag.create(req.body);
    await Post.findByIdAndUpdate(req.post.id, {
      $push: { tags: newTag },
    });
    await Tag.findByIdAndUpdate(newTag._id, {
      $push: { posts: req.post.id },
    });
    res.status(201).json(newTag);
  } catch (error) {
    next(error);
  }
};
