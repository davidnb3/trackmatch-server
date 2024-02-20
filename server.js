const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const app = express();
// const authRoutes = require("./routes/auth");
const trackRoutes = require("./routes/tracks");
const playlistRoutes = require("./routes/playlists");

app.use(cors());
app.use(express.json());

mongoose
  .connect(
    "mongodb+srv://david:NBMiDuahiZxPvDK2@trackmatchcluster0.dazfjrx.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Successfully connected to MongoDB Atlas!");
  })
  .catch((error) => {
    console.log("Unable to connect to MongoDB Atlas!");
    console.error(error);
  });

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

//___ROUTES
app.use("/images", express.static(path.join(__dirname, "images")));
// app.use("/auth", authRoutes);
app.use("/trackmatches", trackRoutes);
app.use("/playlists", playlistRoutes);

app.listen(3001);
