const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ExerciseSchema = new Schema({
    name: String,
    type: String,
    weight: {
        type: Number,
        default: 0
    },
    sets: {
        type: Number,
        default: 0
    },
    reps: {
        type: Number,
        default: 0
    },
    duration: {
        type: Number,
        default: 0
    }
});

const Exercise = mongoose.model("Exercise", ExerciseSchema)

module.exports = Exercise;