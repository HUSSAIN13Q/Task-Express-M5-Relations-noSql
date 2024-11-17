const Post = require("../../models/Post");
const Tag = require("../../models/tag");

exports.addTag = async (req, res, next) => {
  try {
    const { tagId } = req.params;

    await Post.findByIdAndUpdate(req.post.id, {
      $push: { tags: tagId },
    });
    await Tag.findByIdAndUpdate(tagId, {
      $push: { posts: req.post.id },
    });
  } catch (error) {
    next(error);
  }
};
