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
app.use(express.static("public"));
app.set('view engine', 'ejs');

// BodyParser
app.use(express.urlencoded({extended: true}));

// Model Schema
const blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now}
});

const Blog = mongoose.model("Blog", blogSchema);

//Index Route
app.get("/", (req, res) => {
    Blog.find({}, (err, blogs) => {
        if(err){
            console.log(err);
        } else {
            res.render("index", {blogs:blogs});
        }
    });
});

//New Route
app.get("/new", (req, res) => {
    res.render("new");
});

//Create Route
app.post("/", (req, res) => {
    //create post
    console.log(req.body);
    Blog.create(req.body.blog, (err, newBlog) => {
        if(err) {
            res.render("new");
            console.log(newBlog);
        } else {
            res.redirect("/");
            console.log(newBlog);
        }
    });
});

//Show Blog Route
app.get("/:id", (req, res) => {
    Blog.findById(req.params.id, (err, foundBlog) => {
        if(err) {
            res.redirect("/");
        } else {
            res.render("show", {blog: foundBlog});
        }
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server started on port ${PORT}`));


