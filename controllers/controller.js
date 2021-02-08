const express = require("express");
const router = express.Router();
const exercises = require("../models/exercise");
const workouts = require("../models/workout");

router.get("/", (req,res) => {
    res.render("index", {
        exercises: exercises,
        workouts: workouts
    });
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
});

router.post("/api/workout", (req, res) => {
    const workout = req.body;
    workout.date = new Date();
    workout.id = workouts.length +1;
    workout.exercises = workout.exercises.map(exercise => {
        const obj = JSON.parse(exercise)
        obj.complete = false;
        return obj;
    });
    workout.complete = false;
    workouts.push(workout);
    res.redirect("/");
});

router.post("/api/exercise", (req, res) => {
    // TODO Swap to Mongoose save
    const exercise = req.body;
    exercise.id = exercises.length + 1;
    exercises.push(req.body);
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

function ensureAuthenticated(req, res, next) {

    if (req.session.user) {
        return next();
    }
    else {
        res.redirect("/signin")
    }

}

module.exports = router;