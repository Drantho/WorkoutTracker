const express = require("express");
const router = express.Router();

const db = require("../models")

router.get("/", (req,res) => {
    db.Exercise.find({}).lean().then(exercises => {
        db.Workout.find({}).populate("exercises").lean().then(workouts => {
            res.render("index", {
                exercises: exercises,
                workouts: workouts
            })            
        })        
    })
});

router.get("/addexercise", (req, res) => {
    res.render("addexercise");
});

router.get("/addworkout", (req, res) => {        
    db.Exercise.find({}).lean().then(data => {
        res.render("addworkout", {exercises: data});
    })
});

router.post("/api/workout", (req, res) => {
    console.log(req.body);
    db.Workout.create(req.body).then(data => {
        res.redirect("/");
    })    
});

router.post("/api/exercise", (req, res) => {
    db.Exercise.create(req.body).then(data => {
        res.redirect("/")
    })    
});

router.put("/api/exercise/:id", (req, res) => {
    db.Exercise.updateOne({_id: req.params.id}, req.body).then(data => {
        res.redirect("/");
    })    
});

router.put("/api/workout/:id", (req, res) => {
    db.Workout.updateOne({_id: req.params.id}, req.body).then(data => {
        res.redirect("/");
    })    
});

router.put("/api/setcomplete/workout/:workoutid", (req, res) => {
    db.Workout.updateOne({_id: req.params.id}, {complete: true}).then(data => {
        res.redirect("/");
    }) 
});


router.put("/api/setincomplete/workout/:workoutid", (req, res) => {
    db.Workout.updateOne({_id: req.params.id}, {complete: true}).then(data => {
        res.redirect("/");
    }) 
});

module.exports = router;