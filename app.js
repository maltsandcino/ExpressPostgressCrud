const express = require("express");
const app = express();
const path = require("node:path");
const algorithmsRouter = require("./routes/algorithmsRouter");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use("/", algorithmsRouter);

const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));
app.use('/static', express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 3000;
app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }
  console.log(`Express app listening on port ${PORT}!`);
});