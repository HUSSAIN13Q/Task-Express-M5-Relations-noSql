const express = require("express");
const router = express.Router();
const { tagsCreate, tagsGet } = require("./tags.controllers");

router.get("/", tagsGet);
router.post("/", tagsCreate);

module.exports = router;
