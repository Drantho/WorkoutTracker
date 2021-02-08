// const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();
const exercises = require("../models/exercise")

require('dotenv').config()


router.get("/", (req,res) => {
    console.log(exercises);
    res.render("index", {exercises: exercises});
});

router.get("/addexercise", (req, res) => {
    res.render("addexercise");
});

router.get("/addworkout", (req, res) => {
    exercises.map( exercise => {
        exercise.string = JSON.stringify(exercise);
        return exercise;
    })

    res.render("addworkout", {exercises: exercises});
})

router.post("/api/exercise", (req, res) => {
    // TODO Swap to Mongoose save
    const exercise = req.body;
    exercise.id = exercises.length + 1;
    exercises.push(req.body);
    res.redirect("/")
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