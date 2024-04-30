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

router.get('/statistics', async (req, res) => {

  let added_todos = await getAsync("added_todos");

  // Check if added_todos is a valid object
  if (!isNaN(added_todos)) {
    res.status(200).send({ 'added_todos': parseInt(added_todos) }); 
  } else {
    res.status(500).send('Error: Invalid todo count'); 
  }
});


module.exports = router;
