const router = require('express').Router();
const path = require('path');
const { Workout } = require('../models');

// router.get('/', async (req, res) => {
//   res.sendFile('./public/index.html');
// });


router.get('/', async (req, res) => {
  res.sendFile('./public/index.html');
});

//  
router.get('/stats', async (req, res) => {
  res.sendFile(path.join(__dirname, '../public','stats.html'));
});

router.get('/exercise', async (req, res) => {

  res.sendFile(path.join(__dirname, '../public','exercise.html'));
});


router.get('/exercise/:id', async (req, res) => {

  const workout = await Workout.findById(req.params.id);
  res.sendFile('./public/exercise.html');
});



module.exports = router;