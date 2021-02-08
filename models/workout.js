const workouts = [
    {
        id: 1,
        name: "Leg day",
        complete: false,
        date: "2021/2/7",
        exercises: [
            {
                id: 1,
                name: "squats",
                type: "leg",
                weight: 200,
                sets: 3,
                reps: 5,
                duration: undefined
            },{
                id: 2,
                name: "lunges",
                type: "leg",
                weight: 20,
                sets: 3,
                reps: 5,
                duration: undefined
            }
        ]
    }
]

module.exports = workouts;