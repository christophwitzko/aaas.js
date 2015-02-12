'use strict'

var dotenv = require('dotenv')
var aaas = require('../')

dotenv.load()

var service = aaas({server: 'https://aaas-test.herokuapp.com/', username: process.env.USERNAME, password: process.env.PASSWORD})

service.newArray(function (err, arr) {
  if (err) return console.log(err)
  arr.unshift('A', function (err) {
    if (err) return console.log(err)
    arr.remove(0, function (err, data) {
      if (err) return console.log(err)
      console.log(data)
      arr.removeArray(function (err) {
        if (err) return console.log(err)
        console.log('array removed')
      })
    })
  })
})

/*service.clearStore(function (err) {
  if (err) return console.log(err)
  console.log('cleared')
})*/

/*service.getStoreKeys(function (err, data) {
  if (err) return console.log(err)
  console.log(data.keys)
})*/
