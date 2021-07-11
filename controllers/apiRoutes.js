const router = require('express').Router();
const db = require('../models');
// const { addDurations } = require('../utils/helpers')


router.get('/workouts', async (req, res) => {
  // returns all the workouts...

  // const workouts = addDurations(dbWorkouts);
  const workouts = await db.Workout.aggregate([
    {
      '$addFields': {
        'totalDuration': {
          '$sum': '$exercises.duration'
        }
      }
    }
  ]);

  res.end(JSON.stringify(workouts));

});

router.get('/workouts/range', async (req, res) => {

  const days = 7; // Days you want to subtract
  const weekago = new Date((new Date()).getTime() - (days * 24 * 60 * 60 * 1000));

  const workouts = await db.Workout.aggregate([
    {
      '$addFields': {
        'totalDuration': {
          '$sum': '$exercises.duration'
        }
      }
    }, {
      '$match': {
        'day': {
          '$gte':  weekago
        }
      }
    }
  ]);

  res.end(JSON.stringify(workouts));

});


router.put('/workouts/:id', async (req, res) => {
  const workout = await db.Workout.findByIdAndUpdate(req.params.id,
    { $push: { exercises: req.body } },
    { new: true });

  res.json(workout);
});

router.post('/workouts', async (req, res) => {
  const workout = await db.Workout.create({
    day: new Date(),
    ...req.body
  })
  res.json(workout);
});


module.exports = router;