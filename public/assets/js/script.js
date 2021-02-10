const workoutNameDisplay = $("#workoutNameDisplay");
const workoutNameInput = $("#workoutNameInput");

// get exercises and fill checkboxes
const fillChecks = () => {
    const workoutId = $("#workoutId").val();
    $.ajax({
        url: "/api/workout/" + workoutId
    }).then(data => {
        console.log(data);
        console.log(data.exercises)
        data.exercises.forEach(exercise => {
            console.log(`exercise: `, exercise)
            $("input[type=checkbox]").each(function(){
                if(exercise === $(this).attr("id")){
                    console.log(`${exercise} === `, $(this).attr("id"));
                    $(this).attr("checked", true)
                }
            })
        })
    })
}