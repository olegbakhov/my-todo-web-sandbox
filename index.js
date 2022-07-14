const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const exphbs = require('express-handlebars')
const todoRoutes = require('./routes/todos')

const PORT = process.env.PORT || 3000

const app = express()
const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
})

app.engine('hbs', hbs.engine) //registrating hbs.engine in 'hbs' in express
app.set('view engine', 'hbs') //using engine: value 'hbs' should be same
app.set('views', 'views') //registrating in express dir with all views

app.use(express.urlencoded({extended: true})) //middleware from express (urlencoded)
app.use(express.static(path.join(__dirname, 'public'))) //func path, method join, current dir __dirname, express knows that dir public is static

app.use(todoRoutes) //registrating by method use(new middleware) with parameter todosRoutes

async function start() {
    try {
        await mongoose.connect(
            'mongodb+srv://oleg:Givemealuck_4@cluster0.qhhas.mongodb.net/todos',
        )
        app.listen(PORT, () => {
            console.log('Server running')    
        })
    }   catch (e) {
        console.log(e)
    }
}

// app.get('/todos', (req, res) => {
//     Todo.find().then((todos) => {
//       res.send({todos})
//     }, (e) => {
//       res.status(400).send(e)
//     })
//   })

// app.post('/todos', (req, res) => {
//     let todo = new Todo({
//       text: req.body.text
//     })
   
//     todo.save().then((doc) => {
//       res.send(doc)
//     }, (e) => {
//       res.status(400).send(e)
//     })
//   })

start()

// module.exports = {app}
