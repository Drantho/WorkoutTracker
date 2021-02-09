const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
    name: String,
    complete: {
        type: Boolean,
        default: false
    },
    date: {
        type: Date,
        default: Date.now
    },
    exercises:[
        {
            type: Schema.Types.ObjectId,
            ref: "Exercise"
        }]
});

const Workout = mongoose.model("Workout", WorkoutSchema)

module.exports = Workout;