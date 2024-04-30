const express = require('express');
const { Todo } = require('../mongo')
const router = express.Router();
const { getAsync, setAsync } = require('../redis')

/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({})
  res.send(todos);
});

/* POST todo to listing. */
router.post('/', async (req, res) => {

  const todoCounter = () => {
    let added_todos = parseInt(getAsync('added_todos')) || 0
    if (added_todos !== 0 && added_todos !== null) {
      console.log('hello?')
      setAsync('added_todos', added_todos + 1)
    } 
  }

  const todo = await Todo.create({
    text: req.body.text,
    done: req.body.done
  })

  todoCounter();

  res.send(todo);
});


const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params
  req.todo = await Todo.findById(id)
  if (!req.todo) return res.sendStatus(404)

  next()
}


/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.delete()  
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get('/', async (req, res) => {
  if (req.todo) { res.send(req.todo) }
  else {res.sendStatus(404)}
});

/* PUT todo. */
singleRouter.put('/', async (req, res) => {
  if (!req.body.text && typeof req.body.done !== 'boolean') {
    return res.status(400).json({ error: 'Invalid request data' });
  }

  const updatedTodo = { text: req.body.text, done: req.body.done }
  const result = await Todo.updateOne({ _id: req.todo.id}, updatedTodo);

  res.send(result);
});

router.use('/:id', findByIdMiddleware, singleRouter)


module.exports = router;
