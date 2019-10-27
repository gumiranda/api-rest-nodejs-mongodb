require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const variables = require("../bin/configuration/variables");
const postRouter = require("../routes/post-router");
const photoRouter = require("../routes/photo-router");
const chatRouter = require("../routes/chat-router");
const schedulingRouter = require("../routes/scheduling-router");
const solicitationRouter = require("../routes/solicitation-router");
const notificationRouter = require("../routes/notification-router");
const usuarioRouter = require("../routes/usuario-router");
const auth = require("../middlewares/authentication");
const morgan = require("morgan");
const app = express();
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", req.headers.origin || "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET,POST,PUT,HEAD,DELETE,OPTIONS"
  );
  res.header("Access-Control-Allow-Headers", "content-Type,x-requested-with,Authorization");
  next();
});
require("./prod")(app);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan("dev"));
module.exports = app;

mongoose.connect(variables.Database.connection, { useNewUrlParser: true });

//app.use(auth);

app.use("/api/post", postRouter);
app.use("/api/photo", photoRouter);
app.use("/api/solicitation", solicitationRouter);
app.use("/api/usuario", usuarioRouter);
app.use("/api/chat", chatRouter);
app.use("/api/scheduling", schedulingRouter);
app.use("/api/notification", notificationRouter);
