const { getAsync } = require('../redis')

const express = require('express');
const router = express.Router();

const configs = require('../util/config')

let visits = 0

/* GET index data. */
router.get('/', async (req, res) => {
  visits++

  res.send({
    ...configs,
    visits,
  });
});

router.get('/statistics', (req, res) => {
  let added_todos = parseInt(getAsync('added_todos'));

  // Check if added_todos is a valid object
  if (!isNaN(added_todos)) {
    res.status(200).send({ added_todos }); // Convert to string before sending
  } else {
    res.status(500).send('Error: Invalid todo count'); // Handle the case when added_todos is NaN
  }
});


module.exports = router;
