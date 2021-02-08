// const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();
const exercises = require("../models/exercise")

require('dotenv').config()


router.get("/", (req,res) => {
    console.log(exercises);
    res.render("index", {exercises: exercises});
});

router.post("/api/workout", (req, res) => {
    // TODO Swap to Mongoose save
    exercises.push(req.body);
    res.json(req.body);
});



function ensureAuthenticated(req, res, next) {

    if (req.session.user) {
        return next();
    }
    else {
        res.redirect("/signin")
    }

}

module.exports = router;