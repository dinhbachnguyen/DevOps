const db = require('../dbClient')
const {merge} = require('mixme')

module.exports = {
  create: (user, callback) => {
    // Check parameters
    if(!user.username)
      return callback(new Error("Wrong user parameters"), null)
    // Create User schema
    const userObj = {
      firstname: user.firstname,
      lastname: user.lastname,
    }
    // Check if user already exists
    db.hgetall(user.username, function(err, res) {
      if (err) return callback(err, null)
      if (!res) {
        // Save to DB
        db.hmset(user.username, userObj, (err, res) => {
          if (err) return callback(err, null)
          callback(null, res) // Return callback
        })
      } else {
        callback(new Error("User already exists"), null)
      }
    })
  },
  get: (username, callback) => {
    if(!username)
      return callback(new Error("Username must be provided"), null)
    db.hgetall(username, function(err, res) {
      if (err) return callback(err, null)
      if (res)
        callback(null, res)
      else
        callback(new Error("User doesn't exists"), null)
    })
  },
  update: (username, user, callback)=>{
    db.hgetall(username, (err, res)=>{
      if(err) return callback(err, null)
      else if(res){
        original = res
        updated = merge(original, user)
        db.hmset(updated.username, updated, (err, res)=>{
          if(err)return callback(err, null)
          callback(null, res)
        })
      }
      else return callback(new Error('user does not exist'), null)
    })
  },
  delete: (username, callback)=>{
    db.del(username, (err, res) =>{
      if(err) return callback(err, null)
      callback(null, res)
    })
  }
}
