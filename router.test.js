const sinon = require('sinon')
const expect = require('expect')
const request = require('supertest')
const express = require('express')

const {ObjectId} = require('mongodb')
const router = require('./routes/todos.js')
const model = require('./models/Todo.js')
const {app} = require('./index.js')

// describe('GET /todos', () => {
//   it('should get all todos', (done) => {
//     request(router)
//       .get('/todos')
//       .expect(500)
//       .expect((res) => {
//         expect(res.body.todos.length).toBe(2)
//       })
//       .end(done)
//   })
// })

describe('POST /todos', () => { // 1
  it('should create a new todo', (done) => {
    let text = 'Test todo text' // 2
 
    request(app) // 3
      .post('/todos')
      .send({text})
      .expect(200)
      .expect((res) => {
        expect(res.body.text).toBe(text)
      })
      .end((err, res) => { // 4
        if (err) {
          return done(err)
        }
 
        Todo.find({text}).then((todos) => { // 5
          expect(todos.length).toBe(1)
          expect(todos[0].text).toBe(text)
          done()
        }).catch((e) => done(e))
      })
  })
 
  it('should not create todo with invalid body data', (done) => { // 6
 
    request(app) // 7
      .post('/todos')
      .send({})
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err)
        }
 
        Todo.find().then((todos) => { // 8
          expect(todos.length).toBe(2)
          done()
        }).catch((e) => done(e))
      })
  })
})