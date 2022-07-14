const { Router } = require('express')
const Todo = require('../models/Todo')
const router = Router()

router.get('/', async (req, res) => {
    const todosList = await Todo.find({}).lean() // returns json, not mongo model  https://mongoosejs.com/docs/tutorials/lean.html

    res.render('index', { // it works with object that express returns
        title: 'Todos list',
        isIndex: true,
        todos: todosList
    })
})

router.get('/create', (req, res) => {
    res.render('create', {
        title: 'Create todo',
        isCreate: true
    })
})

router.post('/create', async (req, res) => {//turn to router, call post ,method POST to process POST req
    const todo = new Todo({
        title: req.body.title //by help "new" turn to Todo, title(title field that exists on create.hbs) got from browser
    })
    await todo.save() //async action, should await
    res.redirect('/')
})

router.post('/complete', async (req, res) => {
    const id = req.body.id;
    const todo = await Todo.findById(id) //method findById with params req body id(this param from index.hbs)
    todo.completed = !!req.body.completed //because we got param req.body.completed as a string convert it for boolean with !! 
    await todo.save()

    res.redirect('/')
})

module.exports = router //export from file