const express = require("express");
const app = express();
const postsRoutes = require("./api/posts/posts.routes");
const authoerRoutes = require("./api/author/author.routes");
const tagRoutes = require("./api/tag/tag.routes");

const connectDb = require("./database");

connectDb();
app.use(express.json());
app.use("/posts", postsRoutes);
app.use("/authors", authoerRoutes);
app.use("/tags", tagRoutes);

app.use((req, res, next) => {
  res.status(404).json({ message: "Path not found" });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500);
  res.json({
    message: err.message || "Internal Server Error",
  });
});

app.listen(8007, () => {
  console.log("The application is running on ");
});
