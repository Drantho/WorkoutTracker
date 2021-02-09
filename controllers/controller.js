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

router.get("/exercise/:id", (req, res) => {
    db.Exercise.findById(req.params.id).lean().then(exercise => {
        res.render("viewexercise", {exercise: exercise});
    })
})

router.get("/workout/:id", (req, res) => {
    db.Workout.findById(req.params.id).populate("Exercise").lean().then(workout => {
        workout.date = formatDate(workout.date)
        db.Exercise.find({}).lean().then(exercises => {
            res.render("viewworkout", {
                workout: workout,
                exercises: exercises
            })
        })
    })
})

router.get("/api/workout/:id", (req, res) => {
    db.Workout.findById(req.params.id).populate("Exercise").lean().then(data => {
        res.json(data)
    })
})

router.post("/api/workout", (req, res) => {
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

router.post("/api/updateexercise", (req, res) => {

    const exercise = req.body;
    exercise.weight = parseInt(exercise.weight) || 0;
    exercise.reps = parseInt(exercise.reps) || 0;
    exercise.duration = parseInt(exercise.duration) || 0;
    exercise.sets = parseInt(exercise.sets) || 0;

    db.Exercise.updateOne({_id: req.body._id}, exercise).then(data => {
        res.redirect("/exercise/"+ req.body._id);
    })    
});

router.post("/api/updateworkout", (req, res) => {

    console.log(req.body);

    const workout = req.body;
    workout.complete = workout.complete === "on";
    workout.date = new Date(workout.date);

    db.Workout.updateOne({_id: req.body._id}, workout).then(data => {
        res.redirect("/workout/"+ req.body._id);
    })    
});

router.put("/api/setcomplete/workout/:workoutid", (req, res) => {
    db.Workout.updateOne({_id: req.params.id}, {complete: true}).then(data => {
        res.redirect("/");
    }) 
});

router.put("/api/setincomplete/workout/:workoutid", (req, res) => {
    db.Workout.updateOne({_id: req.params.id}, {complete: false}).then(data => {
        res.redirect("/");
    }) 
});

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}

module.exports = router;