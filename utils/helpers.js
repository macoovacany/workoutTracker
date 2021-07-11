
addDurations = (dbWorkouts) => {

  // console.log(dbWorkouts)
  let workouts = []
  dbWorkouts.forEach((wo, index) => {
    workoutDuration = wo.exercises.reduce((accDuration, exercise) => {
      return accDuration + exercise.duration;
    }, 0)
    workouts[index] = {
      totalDuration: workoutDuration,
      ...wo
    };
  })
  return workouts;
}




module.exports = {
  addDurations,
}