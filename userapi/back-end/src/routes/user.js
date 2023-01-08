const express = require('express')
const userController = require('../controllers/user')

const userRouter = express.Router()

userRouter
  .post('/', (req, resp) => {
    userController.create(req.body, (err, res) => {
      let respObj
      if(err) {
        respObj = {
          status: "error",
          msg: err.message
        }
        return resp.status(400).json(respObj)
      }
      respObj = {
        status: "success",
        msg: res
      }
      resp.status(200).json(respObj)
      
    })  
  })
  .get('/:username', (req, resp, next) => { // Express URL params - https://expressjs.com/en/guide/routing.html
    const username = req.params.username
    userController.get(username, (err, res) => {
      let respObj
      if(err) {
        respObj = {
          status: "error",
          msg: err.message
        }
        return resp.status(400).json(respObj)
      }
      respObj = {
        status: "success",
        msg: res
      }
      resp.status(200).json(respObj)
    })
  })
  .post('/update/:username', (req, resp) =>{
    const username = req.params.username
    const user = req.body
    userController.update(username, user,(err, res)=>{
      if(err){
        respObj = {
          status: 'error',
          message: err
        }
        return resp.status(400).json(respObj)
      }
      respObj = {
        status: 'success',
        message: res
      }
      return resp.status(202).json(respObj)

    })
  })
  .post('/delete/:username', (req, resp)=>{
    const username = req.params.username
    userController.delete(username, (err, res)=>{
      if(err){
        respObj = {
          status: 'error',
          message: err
        }
        return resp.status(400).json(respObj)
      }
      respObj = {
        status: 'error',
        message: err
      }
      resp.status(200).json(respObj)
    })
  })
  
module.exports = userRouter
