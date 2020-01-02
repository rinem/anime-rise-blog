const express = require("express");
const mongoose = require("mongoose");
const app = express();

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("DB connected..!"))
    .catch(err => console.log(err));

// EJS
app.use(expressLayouts)
app.set('view engine', 'ejs');

// BodyParser
app.use(express.urlencoded({extended: false}));


