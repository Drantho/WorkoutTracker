const express = require("express");
const router = express.Router();

const db = require("../models")

router.get("/", (req,res) => {
    db.exercises.find({}).then(date => {

    })
});

router.get("/addexercise", (req, res) => {
    res.render("addexercise");
});

router.get("/addworkout", (req, res) => {
    

    res.render("addworkout");
});

router.post("/api/workout", (req, res) => {
    
    res.redirect("/");
});

router.post("/api/exercise", (req, res) => {
    
    res.redirect("/")
});

router.put("/api/exercise/:id", (req, res) => {
    //TODO MONGOOSE Stuff

    res.redirect("/");
});

router.put("/api/workout/:id", (req, res) => {
    //TODO MONGOOSE STUFF

    res.redirect("/");
});

router.put("/api/setcomplete/workout/:workoutid/exercise/:exerciseid", (req, res) => {
    //TODO MONGOOSE STUFF

    res.redirect("/")
});

module.exports = router;