const { Schema, model } = require('mongoose') //import from mongoose object Schema and func model

const schema = new Schema({ //class-constructor Schema
    title: { //title field, global class - String
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    }
})

module.exports = model('Todo', schema)