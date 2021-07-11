const express = require("express");
// const mongojs = require("mongojs");
const logger = require("morgan");
const path = require("path");
const routes = require('./controllers');
const mongoose = require('mongoose');

const app = express();

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public'));

app.use(routes);


// database stuff...
mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost/workout',
  {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  });

// const databaseUrl = "notetaker";
// const collections = ["notes"];
// const db = mongojs(databaseUrl, collections);
// db.on("error", error => {
//   console.log("Database Error:", error);
// });

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
