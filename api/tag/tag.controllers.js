const Tag = require("../../models/tag");

exports.tagsGet = async (req, res, next) => {
  try {
    const tags = await Tag.find().populate({
      path: "postat",
      select: "-tamqat -__v",
      populate: {
        path: "alkatib",
        select: "-postat -__v",
      },
    });
    res.status(200).json(tags);
  } catch (error) {
    next(error);
  }
};

exports.tagsCreate = async (req, res, next) => {
  try {
    const newTag = await Tag.create(req.body);
    res.status(201).json(newTag);
  } catch (error) {
    next(error);
  }
};
